import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';
import { User as IUser } from '../../../types/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return;
  }

  await dbConnect();
  if (req.method === 'POST') { // follow and unfollow
    const { userId, profileId, action } = req.body;

    if ((!userId || !profileId || !action) && req.method === 'POST') {
      res.status(422).json({
        message: 'Invalid Request'
      });
      return;
    }

    if (profileId === userId && req.method === 'POST') {
      res.status(422).json({
        message: 'Cannot follow yourself'
      });
      return;
    }

    const follows = await User.find({_id: userId}).select('-password');
    const shouldFollow = follows[0].follows.filter((user: ObjectId) => new ObjectId(user).valueOf() === profileId);

    if (shouldFollow.length > 0) {
      await User.findByIdAndUpdate({_id: userId}, {
        $pull: {
          follows: profileId
        }
      });
      await User.findByIdAndUpdate({_id: profileId}, {
        $pull: {
          followed: userId
        }
      });
      res.status(201).json({isNew: false});
      return;
    }

    await User.findByIdAndUpdate({_id: userId}, {
      $push: {
        follows: profileId
      }
    });
    await User.findByIdAndUpdate({_id: profileId}, {
      $push: {
        followed: userId
      }
    });
    res.status(201).json({isNew: true});
    return;
  }

  if (req.method === 'GET') { //get following status
    const {action, username, sessionId} = req.query;
    const user = await User
      .find({_id: sessionId})
      .select('-password')
      .select('-email')
      .populate({path: 'follows', select: '-password, -email'});
    if (!user) {
      res.status(404).json({
        message: 'User not found'
      });
    }

    const isFollowing = user[0].follows.filter((user: IUser) => user.username === username);
    if (isFollowing.length === 0) {
      res.status(201).json({isFollowing: false});
      return;
    }
    res.status(201).json({isFollowing: true});
    return;
  }
}
