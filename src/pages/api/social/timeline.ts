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
  //Temporary
  if (!userId) {
    res.status(422).json({
      message:
        'Invalid User',
    });
  }

  const tweets = await Tweet.find({userId}).sort({createdAt: -1}).populate('userId'); // finds User Tweets

  if (!tweets) {
    res.status(422).json({
      message:
        'Cannot find Tweets',
    });
  }

  const followsTweets = await User.find({userId}).sort({createdAt: -1}).populate('follows');
  console.log(followsTweets);
  res.status(200).json(tweets);
}
