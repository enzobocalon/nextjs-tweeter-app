import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Retweet from '../../../models/Retweet';
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
    const hasUserAlreadyLiked = tweet.likes.filter(user => user === userId);
    if (hasUserAlreadyLiked.length > 0) { // Remove Like if already liked
      await Tweet.findByIdAndUpdate(tweetId,
        {
          $pull: {
            likes: userId
          }
        });
      res.status(200).json({isNew: false});
      return;
    }

    await Tweet.findByIdAndUpdate(tweetId,
      {
        $push: {
          likes: userId
        }
      });
    res.status(200).json({isNew: true});
    return;
  }

  if (action === 2) { // Retweet
    const tweet: ITweet | null = await Tweet.findOne({_id: tweetId}); // check if Tweet does exist
    if (!tweet) {
      res.status(422).json({
        message:
          'No Tweet found',
      });
      return;
    }

    const hasUserAlreadyRetweeted = await Retweet.findOne({tweetId: tweetId, userId: userId});
    if (hasUserAlreadyRetweeted) {
      await Retweet.findOneAndDelete({tweetId: tweetId, userId: userId}); // removes from Retweet Collection
      await Tweet.findByIdAndUpdate(tweetId,  { // Removes from Tweet's retweet array
        $pull: {
          retweets: userId
        }
      });
      res.status(200).json({isNew: false});
      return;
    }

    await Retweet.create({tweetId: tweetId, userId: userId});
    await Tweet.findByIdAndUpdate(tweetId, {
      $push: {
        retweets: userId
      }
    });
    res.status(200).json({isNew: true});
    return;
  }

}
