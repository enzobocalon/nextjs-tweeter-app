import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }],
  retweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }],
  bookmarks: {
    type: Number,
    default: 0,
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply',
    default: null
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  media: {
    type: [String],
    default: [''],
  }
});

export default mongoose.models['Tweet'] || mongoose.model('Tweet', TweetSchema);