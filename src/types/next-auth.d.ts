import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string,
    username: string
    avatar: string,
    banner: string
  }
}
