import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Retweet from '../../../models/Retweet';
import User from '../../../models/User';
import Tweet from '../../../models/Tweet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  const {username} = req.query;

  if (!username) {
    res.status(422).json({
      message: 'User not found'
    });
    return;
  }

  await dbConnect();
  const user = await User
    .find({username}, {password: 0, email: 0})
    .populate({
      path: 'tweets', model: Tweet, options: {sort: {'createdAt': -1}, populate: {path: 'userId', select: '-password -email'}}
    });

  const retweets = await Retweet
    .find({userId: user[0]._id})
    .populate({path: 'tweetId', model: Tweet, populate: {path: 'userId', select: '-password -email'}})
    .sort({createdAt: -1});

  res.status(201).json([user[0], retweets]);
}
