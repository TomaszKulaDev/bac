// src/models/song.ts
import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  youtubeId: { type: String, required: true },
  impro: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Song = mongoose.models.Song || mongoose.model("Song", songSchema);
