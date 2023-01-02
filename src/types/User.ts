export interface User {
  _id: string
  name: string,
  username: string,
  password: string,
  email: string,
  banner: string,
  avatar: string,
  bio: string,
  followed: (string | User | undefined)[],
  follows: (string | User | undefined)[],
  likes: string[], // temporary
  tweets: string[] // temporary
}
