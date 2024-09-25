import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Song from '@/models/Song';

export async function GET() {
  try {
    await connectToDatabase();
    const songs = await Song.find({}).sort({ createdAt: -1 });
    console.log('Pobrane piosenki:', songs);
    return NextResponse.json(songs);
  } catch (error) {
    console.error('Błąd podczas pobierania piosenek:', error);
    return NextResponse.json({ error: 'Wystąpił błąd podczas pobierania piosenek' }, { status: 500 });
  }
}
