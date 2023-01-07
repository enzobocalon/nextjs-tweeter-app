import { NextApiRequest, NextApiResponse } from 'next';
import Bookmark from '../../../models/Bookmark';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  const { userId } = req.query;

  if (!userId) {
    res.status(422).json({message: 'Invalid request'});
    return;
  }

  const bookmarks = await Bookmark.find({userId}).populate({path: 'tweetId', populate: {path: 'userId', select: '-email -password'}});
  res.status(201).json(bookmarks);
  return;
}
