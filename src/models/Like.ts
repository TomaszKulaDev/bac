import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    index: true
  },
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  }
}, {
  timestamps: true
});

likeSchema.index({ userEmail: 1, songId: 1 }, { unique: true });

export const Like = mongoose.models.Like || mongoose.model('Like', likeSchema); 