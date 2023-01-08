import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import Tweet from '../../../models/Tweet';
import User from '../../../models/User';

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
  const {content, userId, privacy} = req.body;

  if (!userId) {
    res.status(404).json({
      message:
        'User not found',
    });
    return;
  }

  await dbConnect();
  const tweet = await Tweet.create({
    content,
    media: filename,
    userId,
    public: (privacy === 'true')
  });

  await User.findOneAndUpdate({_id: userId}, {
    $push: {
      tweets: tweet._id
    }
  });

  const tweetDetails = await tweet.populate('userId');
  res.status(201).json(tweetDetails);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
