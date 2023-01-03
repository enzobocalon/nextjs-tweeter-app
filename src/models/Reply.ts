import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }],
  repliesTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Tweet'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  media: {
    type: [String],
    default: [''],
  }

});

export default mongoose.models['Reply'] || mongoose.model('Reply', ReplySchema);
