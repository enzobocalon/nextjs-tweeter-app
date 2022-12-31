import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Tweet from '../../../models/Tweet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  await dbConnect();
  const { userId } = req.query;
  //Temporary
  if (!userId) {
    res.status(422).json({
      message:
        'Invalid User',
    });
  }

  const tweets = await Tweet.find({userId}).sort({createdAt: -1}).populate('userId');

  if (!tweets) {
    res.status(422).json({
      message:
        'Cannot find Tweets',
    });
  }
  res.status(200).json(tweets);
}
