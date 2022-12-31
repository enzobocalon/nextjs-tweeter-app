import { StyledContainer } from '../../styles/global';
import SuggestionCard from '../SuggestionCard';

export default function Suggestion() {
  return (
    <StyledContainer style={{marginTop: 24}}>
      <strong>Who to follow</strong>
      <hr style={{marginBottom: 16}}/>

      <SuggestionCard />
      <SuggestionCard />
    </StyledContainer>
  );
}
