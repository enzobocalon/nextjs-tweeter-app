import { ObjectId, Types } from 'mongoose';
import { User } from './User';

export interface Tweet {
  _id: string,
  content: string,
  userId: User,
  likes: (string | ObjectId | undefined)[],
  retweets: Types.ObjectId[],
  replies: Types.ObjectId[],
  createdAt: Date,
  media: string[]
}
