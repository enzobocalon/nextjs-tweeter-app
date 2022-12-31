import { StyledContainer } from '../../styles/global';
import TrendingTopic from '../TrendingTopic';

export default function Trending() {
  return (
    <StyledContainer>
      <strong>Trends for you</strong>
      <hr />

      <TrendingTopic />
      <TrendingTopic />
      <TrendingTopic />
      <TrendingTopic />
      <TrendingTopic />
      <TrendingTopic />
      
    </StyledContainer>
  );
}
