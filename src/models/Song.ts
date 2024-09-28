import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  youtubeId: { type: String, required: true },
});

export const Song = mongoose.models.Song || mongoose.model("Song", songSchema);
