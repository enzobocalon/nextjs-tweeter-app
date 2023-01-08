import styled from 'styled-components';

interface Props {
  onImage: string | null
}

export const Container = styled.div<Props>`
  padding: 10px 1rem;
  display: flex;
  align-items: ${({onImage}) => onImage ? 'flex-start' : 'center'};
  gap: 1rem;

  border-bottom: 1px solid #F2F2F2;
`;

export const TextAreaContent = styled.div`
  padding: .5rem;

  background: #FAFAFA;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  width: 100%;

  font-family: 'Noto Sans';
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.035em;

  > svg {
    cursor: pointer;
  }

  > div {
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  max-height: 40px;
  overflow-y: auto;
  outline: none;
  resize: none;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Noto Sans',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }

  &::placeholder {
    color: #bdbdbd;
  }

`;

export const ImagePreview = styled.div`
  width: 100%;
  position: relative;

  img {
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
    object-fit: cover;
  }

  svg {
    position: absolute;
    left: 12px;
    top: 12px;
    cursor: pointer;
    z-index: 50;
  }

  ::after {
    content: '';
    position: absolute;
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
    background-color: rgba(0, 0, 0, .2);
    left: 0;
    border-radius: 8px;
  }
`;
