import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Tweet from '../../../models/Tweet';
import Reply from '../../../models/Reply';
import { ObjectId } from 'mongodb';

let filename: string;

const getFilename = (originalName: string) => {
  filename = `${new Date().getTime()} - ${originalName}`;
  return filename;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, `${getFilename(file.originalname)}`),
  }),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('media'));

apiRoute.post(async (req, res) => {
  const { action } = req.body;

  if (action === '1') {
    const { content, userId, repliesTo } = req.body;

    if (!userId || !repliesTo) {
      res.status(404).json({
        message: 'User or Tweet not provided'
      });
      return;
    }

    await dbConnect();
    const tweet = await Tweet.find({_id: repliesTo}).populate('userId');

    if (!tweet) {
      res.status(404).json({
        message: 'Tweet not found'
      });
      return;
    }

    const checkPrivacy = tweet[0].userId.follows.filter((user: ObjectId) => user.valueOf() === userId);
    if (!tweet[0].public) {
      if (checkPrivacy.length === 0 && userId !== tweet[0].userId._id.valueOf()) {
        res.status(422).json({
          message: 'You cannot reply to this Tweet'
        });
        return;
      }

      const reply = await Reply.create({
        content,
        userId,
        repliesTo,
        media: filename
      });

      await Tweet.findByIdAndUpdate({_id: repliesTo}, {
        $push: {
          replies: reply._id
        }
      });

      res.status(201).json(reply);
    } else {
      const reply = await Reply.create({
        content,
        userId,
        repliesTo,
        media: filename
      });

      await Tweet.findByIdAndUpdate({_id: repliesTo}, {
        $push: {
          replies: reply._id
        }
      });

      res.status(201).json(reply);
      return;
    }
    return;
  }

  if (action === '2') { // Likes the reply
    const { replyId, userId } = req.body;

    if (!replyId || !userId) {
      res.status(404).json({
        message: 'User or Tweet not provided'
      });
      return;
    }

    await dbConnect();
    const reply = await Reply.findById(replyId);
    if (!reply) {
      res.status(404).json({
        message: 'Reply not found'
      });
      return;
    }

    const hasUserAlreadyLiked = reply.likes.filter((user: ObjectId) => user.valueOf() === userId);

    if (hasUserAlreadyLiked.length > 0) {
      await Reply.findByIdAndUpdate(replyId, {
        $pull: {
          likes: userId
        }
      });

      res.status(201).json({isNew: false});
      return;
    }

    await Reply.findByIdAndUpdate(replyId, {
      $push: {
        likes: userId
      }
    });

    res.status(201).json({isNew: true});
    return;
  }
});

apiRoute.get(async (req, res) => {
  const { tweetId } = req.query;

  await dbConnect();
  const reply = await Reply.find({repliesTo: tweetId}).sort({createdAt: 1}).populate('userId');
  if (!reply) {
    res.status(404).json({
      message: 'Replies not found'
    });
    return;
  }

  res.status(201).json(reply);
  return;
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
