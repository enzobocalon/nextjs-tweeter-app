import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongooseAdapter } from '@choutkamartin/mongoose-adapter';
import User from '../../../models/User';
import { verifyPassword } from '../../../lib/auth';
import { User as IUser } from '../../../types/User';
import dbConnect from '../../../lib/mongoose';

const options: NextAuthOptions = {
  adapter: MongooseAdapter(process.env.MONGODB_URI as string),
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 // 1 day
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email'},
        password: {label: 'Password'}
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        console.log(credentials);

        if (!credentials.email || !credentials.password) {
          throw new Error('Please provide the required data');
        }

        // Find User in DB
        await dbConnect();
        const {0: user}: IUser[] = await User.find({email: credentials.email});

        if (!user) {
          throw new Error('No user found');
        }
        console.log(user);

        // Verify password
        const verifiedPassword = verifyPassword(credentials.password, user.password);

        if (!verifiedPassword) {
          throw new Error('No user found');
        }
        return {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          banner: user.banner,
          avatar: user.avatar,
          followed: user.followed,
          follows: user.follows,
          likes: user.likes,
          tweets: user.tweets,
        };
      }
    })
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user}) {
      return {
        ...user, ...token,
      };
    },
    async session({session, user, token}) {
      return {
        ...session,
        ...token,
        ...user
      };
    }
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
