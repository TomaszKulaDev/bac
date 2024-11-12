// src/models/song.ts
import mongoose from "mongoose";

interface ISong extends mongoose.Document {
  title: string;
  artist: string;
  youtubeId: string;
  likesCount: number;
}

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  youtubeId: { type: String, required: true },
  impro: { type: Boolean, default: false },
  beginnerFriendly: { type: Boolean, default: false },
  sensual: { type: Boolean, default: false },
  dominicana: { type: Boolean, default: false },
  intermediate: { type: Boolean, default: false },
  advanced: { type: Boolean, default: false },
  slow: { type: Boolean, default: false },
  medium: { type: Boolean, default: false },
  fast: { type: Boolean, default: false },
  likesCount: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: { type: Date, default: Date.now }
});

export const Song = mongoose.models.Song || mongoose.model("Song", songSchema);
