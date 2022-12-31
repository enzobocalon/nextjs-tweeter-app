import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../lib/auth';
import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  await dbConnect();
  const { email, password, username, name } = req.body;

  if (!email || !password || !username || !name) {
    res.status(422).json({
      message:
        'Please provide the required data',
    });
    return;
  }

  if (
    !email ||
    !email.includes('@') || !email.match(emailRegex) ||
    !password ||
    password.trim().length < 7) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  //Verify if the username is already taken
  const findByUsername = await User.find({username: username});
  const findByEmail = await User.find({email: email});

  console.log(findByEmail);
  console.log(findByUsername);

  if (findByUsername.length > 0) {
    res.status(422).json({
      message: 'Username is already taken'
    });
    return;
  }

  if (findByEmail.length > 0) {
    res.status(422).json({
      message: 'Email is already registered'
    });
    return;
  }

  // Encrypt password
  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    console.log('teste');

    res.status(500).json({
      message: 'Internal Server Error - Contact Support'
    });
    return;
  }

  await User.create({
    name,
    username,
    email,
    password: hashedPassword
  });

  res.status(200).json({
    message: 'User created'
  });
}
