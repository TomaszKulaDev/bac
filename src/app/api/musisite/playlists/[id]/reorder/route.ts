// src/app/api/playlists/[id]/reorder/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Playlist } from '@/models/Playlist';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { newOrder } = await request.json();
    if (!Array.isArray(newOrder)) {
      return NextResponse.json(
        { error: 'Invalid order format' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    const playlist = await Playlist.findOneAndUpdate(
      { _id: params.id, userId: session.user.email },
      { $set: { songs: newOrder } },
      { new: true }
    );

    if (!playlist) {
      return NextResponse.json(
        { error: 'Playlist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(playlist);
  } catch (error) {
    console.error('Error updating playlist order:', error);
    return NextResponse.json(
      { error: 'Failed to update playlist order' },
      { status: 500 }
    );
  }
}