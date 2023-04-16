# About

This is a project provided by [DevChallenges](https://devchallenges.io/) and it's meant to be built as a fullstack project.

- User story: I can see my profile or others' profile

- User story: When I am on a profile, I can see Tweets and Retweets. I can also filter by Tweets, Tweets and replies, Media and Likes

- User story: When I am on a profile, I can see followers and following

- User story: When I am on a profile, I can see follow or unfollow the user

- User story: I can navigate between Home, Explore and Bookmarks

- User story: I can navigate to My Profile, Group Chat (optional), Setting/Authentication App.

- User story: When I am on Home, I can post a new Tweet

- User story: When I post a new Tweet, I can choose to upload an image and set the Tweet to be public or only-follower

- User story: When I am on Home, I can see Tweets of people who I follow

- User story: I can Comment, Retweet, Like or Save a Tweet

- User story: I can Comment with image and I can like a comment

- User story: I can see the posted time of the Comments and Tweets

- User story: When I am on Home, I can see the most popular hashtags and people I should follow (it's up to you how to implement this)

- User story: When I am on Explore, I can see the Top, Latest Tweet, or Tweet with Media. I can also choose to see the most popular people <b>(TODO)</b>

- User story: When I am on Bookmarks, I can see the Saved Tweet

# Tools

- Axios
- Mongoose
- BCrypt
- Multer
- NextJS
- Next Auth
- Next Connect
- React
- React Icons
- React Toastify
- React Spinners
- Styled Components
- Typescript

# My Notes about the Project
The project is far from perfection, but it can be used and it could also use some improvements in the backend, as this is my first attempt building a fullstack application with backend included, so the queries in the database could probably use some improvements, as could the data returned from responses.
This is also my first attemptd building complex databases relationships, so this could also be improved and therefore making the job on frontend easier, as the API responses would have a single pattern to be followed.

I feel I learned a lot about NextJS, NextAuth, Mongoose and Multer by building this project.

# How to run the project
```bash
$ git clone https://github.com/enzobocalon/nextjs-tweeter-app
```

Then you have to install the project dependencies by using

```bash
$ yarn install
```
You can now create a .env file inside the project root folder with the following data

MONGODB_URI = `Here goes your database URL` <br/>
NEXTAUTH_URL = `The URL that your project is running, by default is http://localhost:3000` <br/>
JWT_SECRET = `Your JWT secret` <br/>

And finally

```bash
$ yarn dev
```
The project should be running with no problems.
