import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  youtubeId: { type: String, required: true },
  votes: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  isFavorite: { type: Boolean, default: false },
  userVote: { type: String, enum: ["up", "down", null], default: null },
});

export default mongoose.models.Song || mongoose.model("Song", SongSchema);
