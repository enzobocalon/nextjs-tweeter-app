import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Retweet from '../../../models/Retweet';
import User from '../../../models/User';
import Tweet from '../../../models/Tweet';
import Reply from '../../../models/Reply';
import { Tweet as ITweet } from '../../../types/Tweet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  const {username, action} = req.query;

  if (!username) {
    res.status(404).json({
      message: 'User not found'
    });
    return;
  }

  const user = await User
    .find({username}, {password: 0, email: 0})
    .populate({
      path: 'tweets', model: Tweet,
      options: {sort: {'createdAt': -1},
        populate: {path: 'userId', select: '-password -email'}}
    });

  await dbConnect();
  if (action === '0') {
    if (user.length === 0) {
      res.status(404).json({
        message: 'User not found'
      });
      return;
    }

    const retweets = await Retweet
      .find({userId: user[0]._id})
      .populate({path: 'tweetId', model: Tweet, populate: {path: 'userId', select: '-password -email'}})
      .sort({createdAt: -1});

    res.status(201).json([user[0], retweets]);
    return;
  }

  if (action === '1') {
    const retweets = await Retweet
      .find({userId: user[0]._id})
      .populate({path: 'tweetId', model: Tweet, populate: {path: 'userId', select: '-password -email'}})
      .sort({createdAt: -1});

    const replies = await Reply
      .find({userId: user[0]._id})
      .populate({path: 'repliesTo', populate: {path: 'userId', select: '-password -email'}})
      .populate({path: 'userId', select: '-email -password'})
      .sort({createdAt: -1});

    res.status(201).json([user[0], retweets, replies]);
    return;
  }

  if (action === '2') {
    const replies = await Reply
      .find({userId: user[0]._id})
      .populate({path: 'repliesTo', populate: {path: 'userId', select: '-password -email'}})
      .populate({path: 'userId', select: '-email -password'})
      .sort({createdAt: -1});


    const filteredMediaUser = {
      ...user[0],
      tweets: user[0].tweets.filter((tweet: ITweet) => console.log(tweet))
    };
    const filteredReplies = replies.filter(reply => reply.media[0] !== '');

    res.status(201).json([filteredMediaUser, filteredReplies]);
    return;
  }

  if (action === '3') {
    const userLikes = await User
      .find({username}, {password: 0, email: 0})
      .populate({path: 'likes', populate: {path: 'userId', select: '-email -password'}});

    user[0].tweets = []; // Clear tweets to prevent duplicates
    res.status(201).json([user[0], userLikes[0].likes]);
    return;
  }
}
