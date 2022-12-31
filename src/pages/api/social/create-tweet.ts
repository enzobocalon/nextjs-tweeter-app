import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Tweet from '../../../models/Tweet';

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
  const tweetDetails = await tweet.populate('userId');
  res.status(201).json(tweetDetails);

}
