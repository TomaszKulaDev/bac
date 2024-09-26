import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  youtubeId: { type: String, required: true },
  votes: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  isFavorite: { type: Boolean, default: false },
});

export const Song = mongoose.models.Song || mongoose.model('Song', songSchema);
