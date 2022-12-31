import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false,
    default: ''
  },
  banner: {
    type: String,
    required: false,
    default: ''
  },
  followed:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  }],
  follows: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    default: null
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: false,
    default: null
  }],
  tweets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: false,
    default: null
  }]
});

export default mongoose.models['User'] || mongoose.model('User', UserSchema);
// https://gist.github.com/sourabhbagrecha/9699007e61100bd91ec5db148f49ae12
