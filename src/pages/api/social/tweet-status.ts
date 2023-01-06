import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Bookmark from '../../../models/Bookmark';
import Reply from '../../../models/Reply';
import Retweet from '../../../models/Retweet';
import Tweet from '../../../models/Tweet';
import User from '../../../models/User';
import { Tweet as ITweet } from '../../../types/Tweet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return;
  }

  if (req.method === 'POST') {
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

      const hasUserAlreadyLiked = tweet.likes.filter(user => user?.toString() === userId);
      if (hasUserAlreadyLiked.length > 0) { // Remove Like if already liked
        await Tweet.findByIdAndUpdate(tweetId,
          {
            $pull: {
              likes: userId
            }
          });

        await User.findByIdAndUpdate(userId, {
          $pull: {
            likes: tweet._id
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

      await User.findByIdAndUpdate(userId, {
        $push: {
          likes: tweet._id
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
        const retweet = await Retweet.findOneAndDelete({tweetId: tweetId, userId: userId}); // removes from Retweet Collection
        await Tweet.findByIdAndUpdate(tweetId,  { // Removes from Tweet's retweet array
          $pull: {
            retweets: userId
          }
        });
        await User.findByIdAndUpdate(userId, {
          $pull: {
            retweets: retweet._id
          }
        });
        res.status(200).json({isNew: false});
        return;
      }

      const retweet = await Retweet.create({tweetId: tweetId, userId: userId});
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: {
          retweets: userId
        }
      });
      await User.findByIdAndUpdate(userId, {
        $push: {
          retweets: retweet._id
        }
      });
      res.status(200).json({isNew: true});
      return;
    }

    if (action === 3) { // Bookmarks
      const tweet: ITweet | null = await Tweet.findOne({_id: tweetId}); // check if Tweet does exist
      if (!tweet) {
        res.status(422).json({
          message:
            'No Tweet found',
        });
        return;
      }

      const hasTweetAlreadyBeenBookmarked = await Bookmark.find({tweetId: tweetId, userId: userId});
      if (hasTweetAlreadyBeenBookmarked.length > 0) {
        await Bookmark.findOneAndDelete({tweetId: tweetId, userId: userId});
        await Tweet.findOneAndUpdate(tweetId, {
          $pull: {
            bookmarks: userId
          }
        });
        res.status(200).json({isNew: false});
        return;
      }

      await Bookmark.create({
        tweetId: tweetId,
        userId: userId
      });
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: {
          bookmarks: userId
        }
      });
      res.status(200).json({isNew: true});
      return;
    }
    return;
  }

  if (req.method === 'DELETE') {
    const {tweetId, userId} = req.query;
    const tweet = await Tweet.findById(tweetId);

    if (tweet.userId.valueOf() !== userId) {
      res.status(422).json({message: 'Cannot delete tweet'});
      return;
    }

    const retweet = await Retweet.findOneAndDelete({tweetId});

    if (retweet) {
      await User
        .updateMany({retweets: retweet._id}, {
          $pull: {
            retweets: retweet._id
          }
        });
    }

    await User
      .updateMany({likes: tweetId}, {
        $pull: {
          likes: tweetId
        }
      });

    await Reply.deleteMany({repliesTo: tweetId});
    await Tweet.findByIdAndDelete(tweetId);

    res.status(201).json({message: 'Tweet deleted'});
    return;
  }
}
