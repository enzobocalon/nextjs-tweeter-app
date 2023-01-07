import { StyledContainer } from '../../styles/global';
import { User } from '../../types/User';
import SuggestionCard from '../SuggestionCard';

interface Props {
  suggestions: User[]
}

export default function Suggestion({suggestions}: Props) {
  const randomSuggestions = suggestions.sort(() => .5 - Math.random()).slice(0,2);

  return (
    <StyledContainer style={{marginTop: 24}}>
      <strong>Who to follow</strong>
      <hr style={{marginBottom: 16}}/>

      {
        randomSuggestions.length === 0 ? (
          <p>No user found</p>
        ) : randomSuggestions.length === 1 ? (
          <SuggestionCard suggestion={randomSuggestions[0]} />
        ) : (
          <>
            <SuggestionCard suggestion={randomSuggestions[0]} />
            <SuggestionCard suggestion={randomSuggestions[1]} />
          </>
        )
      }
    </StyledContainer>
  );
}
