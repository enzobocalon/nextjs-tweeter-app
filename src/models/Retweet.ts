import mongoose from 'mongoose';

const RetweetSchema = new mongoose.Schema({
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
    default: Date.now
  }
});

export default mongoose.models['Retweet'] || mongoose.model('Retweet', RetweetSchema);
