// import { createContext, Dispatch, SetStateAction, useState} from 'react';
// import { Tweet } from '../types/Tweet';

// type TweetContextProps = {
//   tweet: Tweet | null,
//   setTweet: Dispatch<SetStateAction<Tweet | null>>
// };

// type TweetProviderProps = {
//   children: React.ReactNode;
// };

// export const TweetContext = createContext({} as TweetContextProps);

// export function TweetProvider({ children }: TweetProviderProps) {
//   const [tweet, setTweet] = useState<Tweet | null>(null);
//   return (
//     <TweetContext.Provider value={{
//       tweet,
//       setTweet
//     }}>
//       {children}
//     </TweetContext.Provider>
//   );
// }




// REMOVE COMMENTS FROM PROVIDER ON _APP
