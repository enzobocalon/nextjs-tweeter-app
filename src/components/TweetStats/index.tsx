import { Tweet } from '../../types/Tweet';
import * as S from './styles';

interface Props {
  likes: Tweet['likes'],
  retweets: Tweet['retweets']
  replies: Tweet['replies'],
}
export default function TweetStats({likes, retweets, replies }: Props) {
  return (
    <S.Container>
      <span>{replies.length} Comments</span>
      <span>{retweets.length} Retweets</span>
      <span>{likes.length} Likes</span>
    </S.Container>
  );
}
