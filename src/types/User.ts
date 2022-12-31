export interface User {
  _id: string
  name: string,
  username: string,
  password: string,
  email: string,
  banner: string,
  avatar: string,
  followed: User[],
  follows: User[],
  likes: string[], // temporary
  tweets: string[] // temporary
}
