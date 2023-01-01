import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Tweet'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models['Bookmark'] || mongoose.model('Bookmark', BookmarkSchema);
