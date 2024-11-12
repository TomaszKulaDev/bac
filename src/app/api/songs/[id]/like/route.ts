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
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    
    const songId = params.id;
    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return NextResponse.json(
        { error: 'Invalid song ID' },
        { status: 400 }
      );
    }

    const song = await Song.findById(songId);
    if (!song) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      );
    }

    const existingLike = await Like.findOne({
      userEmail: session.user.email,
      songId: songId
    });

    let liked;
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      liked = false;
    } else {
      await Like.create({
        userEmail: session.user.email,
        songId: songId
      });
      liked = true;
    }

    // Pobierz aktualną liczbę polubień
    const likeCount = await Like.countDocuments({ songId });

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