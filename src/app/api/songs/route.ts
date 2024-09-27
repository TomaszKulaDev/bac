import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Song } from '@/models/Song';

export async function GET() {
  console.log("GET /api/songs: Start");
  try {
    const db = await connectToDatabase();
    console.log("GET /api/songs: Connected to database");

    const songs = await Song.find({}).lean();
    console.log("GET /api/songs: Songs fetched", songs);

    return new NextResponse(JSON.stringify(songs), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error("GET /api/songs: Error", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
