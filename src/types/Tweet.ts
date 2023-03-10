import { ObjectId } from 'mongoose';
import { User } from './User';

export interface Tweet {
  tweetId: any;
  _id: string,
  content: string,
  userId: User,
  likes: (string | ObjectId | undefined)[],
  retweets: (string | ObjectId | undefined)[]
  replies: (string | ObjectId | undefined)[],
  bookmarks: (string | ObjectId | undefined)[],
  createdAt: Date,
  media: string[],
  public: boolean,
  repliesTo: Tweet
}
