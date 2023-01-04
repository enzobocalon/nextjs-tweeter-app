import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Retweet from '../../../models/Retweet';
import Tweet from '../../../models/Tweet';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  await dbConnect();
  const { userId } = req.query;

  if (!userId) {
    res.status(422).json({
      message:
        'User not Provided',
    });
    return;
  }

  const user = await User
    .findById(userId)
    .select('-password -email');

  if (!user) {
    res.status(404).json({
      message:
        'User not found',
    });
    return;
  }

  const selfTweets = await Tweet
    .find({userId})
    .sort({createdAt: -1})
    .populate({path: 'userId', select: '-password -email'});
  const followersTweets = await Tweet
    .find()
    .where('userId')
    .in(user.follows)
    .sort({createdAt: -1})
    .populate({path: 'userId', select: '-password -email'});
  const followersRetweets = await Retweet
    .find()
    .where('userId')
    .in(user.follows)
    .sort({createdAt: -1})
    .populate({path: 'userId', select: '-password -email'})
    .populate({path: 'tweetId', model: Tweet, populate: {path: 'userId', select: '-password -email'}});

  const mergedData = selfTweets.concat(followersTweets).concat(followersRetweets);
  const sortedData = mergedData.sort((a: Omit<any, never>, b: Omit<any, never>) => {
    return new Date (b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });

  const suggestionsUsers = (await User.find().select('-password -email'))
    .filter(userSuggestion => userSuggestion._id.valueOf() !== user._id.valueOf() && !user.follows.includes(userSuggestion._id));
  res.status(201).json([sortedData, suggestionsUsers]);
}
