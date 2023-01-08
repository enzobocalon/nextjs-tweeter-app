import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';
import { hashPassword } from '../../../lib/auth';

let avatarFilename: string;
let bannerFilename: string;

const getFilename = (originalName: string, fieldname: string) => {
  if (fieldname === 'avatar') {
    avatarFilename = `${new Date().getTime()} - ${originalName}`;
    return avatarFilename;
  }

  if (fieldname === 'banner') {
    bannerFilename = `${new Date().getTime()} - ${originalName}`;
    return bannerFilename;
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, `${getFilename(file.originalname, file.fieldname)}`),
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

apiRoute.use(upload.any());

apiRoute.post(async (req, res) => {
  const {name, username, bio, password, userId, isAvatar, isBanner} = req.body;
  if (!userId) {
    res.status(404).json({message: 'User not found'});
    return;
  }

  if (!name && !username && !bio && !password && !isAvatar && !isBanner) {
    return;
  }

  await dbConnect();
  const oldUserData = await User.findById(userId);

  const doesUsernameExists = await User.find({
    username
  });

  const responseUser = await User.findByIdAndUpdate(userId, {
    name: name ? name : oldUserData.name,
    username: username ? doesUsernameExists.length > 0 ? oldUserData.username : username : oldUserData.username,
    password: password ? hashPassword(password) : oldUserData.password,
    bio: bio ? bio : oldUserData.bio,
    avatar: isAvatar === 'true' ? avatarFilename : oldUserData.avatar,
    banner: isBanner === 'true' ? bannerFilename : oldUserData.banner
  });

  res.status(200).json({responseUser});

});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
