import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { connectToDatabase } from '@/lib/mongodb';
import { Like } from '@/models/Like';
import { Song } from '@/models/Song';
import mongoose from 'mongoose';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    
    if (!userEmail) {
      console.log('Like attempt without email:', session);
      return NextResponse.json(
        { error: 'Unauthorized - No email in session' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const songId = params.id;
    if (!mongoose.Types.ObjectId.isValid(songId)) {
      console.log('Invalid song ID attempt:', songId);
      return NextResponse.json(
        { error: 'Invalid song ID format' },
        { status: 400 }
      );
    }

    const song = await Song.findById(songId);
    if (!song) {
      console.log('Like attempt for non-existent song:', songId);
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      );
    }

    console.log(`Processing like toggle for user ${userEmail} on song ${songId}`);
    
    const existingLike = await Like.findOne({
      userEmail,
      songId
    });

    let liked;
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      liked = false;
      console.log(`Removed like from user ${userEmail} for song ${songId}`);
    } else {
      await Like.create({
        userEmail,
        songId
      });
      liked = true;
      console.log(`Added like from user ${userEmail} for song ${songId}`);
    }

    const likeCount = await Like.countDocuments({ songId });
    console.log(`New like count for song ${songId}: ${likeCount}`);

    return NextResponse.json({ 
      liked,
      likesCount: likeCount 
    });
  } catch (error) {
    console.error('Error in like endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 