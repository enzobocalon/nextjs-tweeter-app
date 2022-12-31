import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Tweet from '../../../models/Tweet';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  await dbConnect();
  const { content, userId, media} = req.body;

  if (!userId || !content) {
    res.status(422).json({
      message:
        'Invalid Tweet Format',
    });
    return;
  }

  const tweet = await Tweet.create({
    content,
    userId,
    media
  });

  await User.findOneAndUpdate(userId, {
    $push: {
      tweets: tweet._id
    }
  });
  const tweetDetails = await tweet.populate('userId');
  res.status(201).json(tweetDetails);

}
