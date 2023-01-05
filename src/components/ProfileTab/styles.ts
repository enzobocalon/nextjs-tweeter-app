import styled from 'styled-components';

interface Props {
  active: boolean;
}

export const TabContainer = styled.div`
  width: 100%;
  max-width: 300px;
  max-height: 220px;

  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 16px;
  padding-left: 0;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const TabItem = styled.div<Props>`
  width: 100%;
  padding: .5rem 2rem;
  margin-block: .5rem;
  border-left: 4px solid transparent;
  position: relative;
  cursor: pointer;

  ::before {
    opacity: ${({active}) => active ? '1' : '0'};
    content: '';
    position: absolute;
    height: 100%;
    width: 3px;
    left: -4px;
    top: 0;
    background-color: #2F80ED;
    border-radius: 0px 4px 4px 0px;
    transition: all .3s ease;
  }

  :hover {
    ::before {
      opacity: 1;
      transition: all .3s ease;
    }
  }
`;
