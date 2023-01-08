import axios from 'axios';
import { useState, useRef, useEffect, SetStateAction, Dispatch } from 'react';

import * as S from './styles';
import TweetActions from '../TweetActions';
import TweetStats from '../TweetStats';
import CreateComment from '../CreateComment';
import Comments from '../Comments';

import { StyledContainer } from '../../styles/global';
import { AiOutlineRetweet } from 'react-icons/ai';
import { MdOutlineModeComment, MdDelete } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';

import { Tweet as ITweet } from '../../types/Tweet';
import { User } from '../../types/User';

import pfpPlaceholder from '../../assets/Profile_avatar_placeholder_large.png';
import { ClipLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import dateFormatter from '../../utils/dateFormatter';

interface Props {
  tweet: ITweet,
  profile?: User
  isRetweet?: boolean
  setTweets: Dispatch<SetStateAction<ITweet[]>>
  isBookMarkPage?: boolean
}

export default function Tweet({tweet, profile, isRetweet, setTweets, isBookMarkPage}: Props) {
  const [tweetData, setTweetData] = useState<ITweet>(tweet);
  const [replies, setReplies] = useState<ITweet[] | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const {data: session} = useSession();

  const handleComments = async () => {
    commentRef.current?.focus();
    setReplies(null);
    setCommentLoading(true);

    await axios.get('/api/social/reply', {
      params: {
        tweetId: tweet.tweetId ? tweet.tweetId._id : tweet.repliesTo ? tweet.repliesTo._id : tweet._id
      }
    }).then(response => {
      setReplies(response.data);
      setCommentLoading(false);
    });
  };

  const handleDelete = async (id: string) => {
    await axios.delete('/api/social/tweet-status', {
      params: {
        tweetId: id,
        userId: session?.id
      }

    }).then(() => {
      setTweets(prev => prev.filter(item => item.tweetId ? item.tweetId._id !== id : item.repliesTo ? item.repliesTo._id !== id : item._id !== id));
      toast.success('Tweet deleted');
    });
  };

  const handleBookmark = () => {
    if (!isBookMarkPage) {
      return;
    }
    setTweets(prev => prev.filter(item => item._id !== tweetData._id));
    toast.success('Tweet removed from bookmarks');
  };

  useEffect(() => {
    setTweetData(tweet);
  }, [tweet]);

  return (
    <>
      {
        tweetData.repliesTo ? (
          <>
            <S.ActionContainer>
              <MdOutlineModeComment color='#828282'/>
              <span>{tweetData.userId.name || profile?.name} Replied</span>
            </S.ActionContainer>
            <StyledContainer style={{marginBottom: 24}}>
              <S.Header>
                <S.HeaderLeft>
                  <img src={tweetData.repliesTo.userId.avatar ? `/uploads/${tweetData.repliesTo.userId.avatar}` : pfpPlaceholder.src} width={40} height={40} alt='profile icon' />

                  <div>
                    <Link href={`/${tweetData.repliesTo.userId.username}`}>
                      <p>{tweetData.repliesTo.userId.name}</p>
                    </Link>
                    <span>{dateFormatter(new Date(`${tweetData.repliesTo.createdAt}`))}</span>
                  </div>
                </S.HeaderLeft>
                {
                  modal && (
                    <S.Modal>
                      {
                        tweetData.repliesTo.userId._id === session?.id ? (
                          <S.ModalContent onClick={() => handleDelete(tweetData.repliesTo._id)}>
                            <MdDelete color='#828282'/>
                            <span>Delete</span>
                          </S.ModalContent>
                        ) : (
                          <p>No action available</p>
                        )
                      }
                    </S.Modal>
                  )
                }
                <SlOptionsVertical color='#828282' onClick={() => setModal(prev => !prev)}/>

              </S.Header>

              <S.TweetContent>
                <p>{tweetData.repliesTo.content}</p>
                {
                  tweetData.repliesTo.media && tweetData.repliesTo.media[0] !== ''  ? <img src={`./uploads/${tweetData.repliesTo.media[0]}`} alt='image'/> : null
                }
              </S.TweetContent>

              <TweetStats
                likes={tweetData.repliesTo.likes}
                replies={tweetData.repliesTo.replies}
                retweets={tweetData.repliesTo.retweets}/>
              <TweetActions
                tweet={tweetData}
                setTweetData={setTweetData}
                handleComments={handleComments}/>
              <CreateComment
                refTextarea={commentRef}
                tweet={tweet}
                tweetId={tweet.repliesTo._id}
                replies={replies}
                setReplies={setReplies}/>

              {
                !commentLoading ? !replies ? (
                  <>
                    <Comments reply={tweetData} setReplies={setReplies}/>
                    <p
                      style={{color: '#BDBDBD', marginTop: 4, cursor: 'pointer'}}
                      onClick={() => handleComments()}>
                      Show Replies
                    </p>
                  </>
                ) :
                  replies.map(reply => {
                    return (
                      <Comments key={reply._id} reply={reply} setReplies={setReplies}/>
                    );
                  }) : (
                  <ClipLoader size={16} color='#2f80ed'/>
                )
              }
            </StyledContainer>
          </>
        ) : (
          <>

            {
              isRetweet && (
                <S.ActionContainer>
                  <AiOutlineRetweet color='#828282'/>
                  <span>{profile?.name} Retweeted</span>
                </S.ActionContainer>
              )
            }
            <StyledContainer style={{marginBottom: 24}}>
              <S.Header>
                <S.HeaderLeft>
                  <img src={tweetData.tweetId ? tweetData.tweetId.userId.avatar ? `/uploads/${tweetData.tweetId.userId.avatar}` : pfpPlaceholder.src : tweetData.userId.avatar ? `/uploads/${tweetData.userId.avatar}` : pfpPlaceholder.src} width={40} height={40} alt='profile icon' />
                  <div>
                    <Link href={tweetData.tweetId ? `/${tweetData.tweetId.userId.username}` : `/${tweetData.userId.username}`}>
                      <p>{tweetData.userId.name || tweetData.tweetId.userId.name}</p>
                      <span>{dateFormatter(new Date(`${tweetData.tweetId ? tweetData.tweetId.createdAt : tweetData.createdAt}`))}</span>
                    </Link>
                  </div>
                </S.HeaderLeft>
                <SlOptionsVertical color='#828282' onClick={() => setModal(prev => !prev)}/>

                {
                  modal && (
                    <S.Modal>
                      {
                        tweetData.tweetId ? tweetData.tweetId.userId._id === session?.id ? (
                          <S.ModalContent onClick={() => handleDelete(tweetData.tweetId._id)}>
                            <MdDelete color='#828282'/>
                            <span>Delete</span>
                          </S.ModalContent>
                        ) : <p>No action available</p> : tweetData.userId._id === session?.id ? (
                          <S.ModalContent onClick={() => handleDelete(tweetData._id)}>
                            <MdDelete color='#828282'/>
                            <span>Delete</span>
                          </S.ModalContent>
                        ) : <p>No action available</p>
                      }
                    </S.Modal>
                  )
                }
              </S.Header>

              <S.TweetContent>
                <p>{tweetData.tweetId ? tweetData.tweetId.content : tweetData.content ? tweetData.content : ''}</p>
                {
                  tweetData.media && tweetData.media[0] !== ''  ? <img src={`./uploads/${tweetData.media[0]}`} alt='image'/> : null
                }
              </S.TweetContent>

              <TweetStats
                likes={tweetData.likes || tweetData.tweetId.likes}
                replies={tweetData.replies || tweetData.tweetId.replies}
                retweets={tweetData.retweets || tweetData.tweetId.retweets}/>
              <TweetActions
                tweet={tweetData}
                setTweetData={setTweetData}
                handleComments={handleComments}
                handleBookmark={handleBookmark}/>
              <CreateComment
                refTextarea={commentRef}
                tweet={tweet}
                tweetId={tweet.tweetId ? tweet.tweetId._id : tweet._id}
                replies={replies}
                setReplies={setReplies}/>

              {
                !replies && !commentLoading ? tweet.tweetId ? tweet.tweetId.replies.length > 0 ? (
                  <p
                    style={{color: '#BDBDBD', marginTop: 4, cursor: 'pointer'}}
                    onClick={() => handleComments()}>
                    Show Replies
                  </p>
                ) : null : tweet.replies.length > 0 ? (
                  <p
                    style={{color: '#BDBDBD', marginTop: 4, cursor: 'pointer'}}
                    onClick={() => handleComments()}>
                    Show Replies
                  </p>
                ) : null : null
              }

              {
                commentLoading ? (
                  <ClipLoader size={16} color='#2f80ed'/>
                ) : replies ? replies.map(reply => (
                  <Comments key={reply._id} reply={reply} setReplies={setReplies}/>
                )) : null
              }
            </StyledContainer>
          </>
        )
      }
    </>
  );
}
