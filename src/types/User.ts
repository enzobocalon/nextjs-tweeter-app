export interface User {
  _id: string
  name: string,
  username: string,
  password: string,
  email: string,
  banner: string,
  avatar: string,
  bio: string,
  followed: (User)[],
  follows: (User)[],
  likes: string[],
  tweets: string[]
}
