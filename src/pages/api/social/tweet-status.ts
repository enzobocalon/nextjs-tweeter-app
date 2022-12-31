import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Tweet from '../../../models/Tweet';
import { Tweet as ITweet } from '../../../types/Tweet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  await dbConnect();
  const { action, tweetId, userId } = req.body;

  if (!userId || !action|| !tweetId) {
    res.status(422).json({
      message:
        'Invalid Action',
    });
    return;
  }

  if (action === 1) { // Likes
    const tweet: ITweet | null = await Tweet.findOne({_id: tweetId});
    if (!tweet) {
      res.status(422).json({
        message:
          'No Tweet found',
      });
      return;
    }
    const hasUserAlreadyLiked = tweet.likes.filter(user => new ObjectId(user).valueOf() === userId);
    if (hasUserAlreadyLiked.length > 0) { // Remove Like if already liked
      const likedTweet = await Tweet.findByIdAndUpdate(tweetId,
        {
          $pull: {
            likes: userId
          }
        });
      res.status(200).json({isNew: false});
      return;
    }
  }

  const likedTweet = await Tweet.findByIdAndUpdate(tweetId,
    {
      $push: {
        likes: userId
      }
    });
  res.status(200).json({isNew: true});
  return;
}
