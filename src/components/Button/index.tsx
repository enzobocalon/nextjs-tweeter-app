import { CSSProperties } from 'styled-components';
import * as S from './styles';

interface ButtonProps {
  children: React.ReactNode,
  onClick?: () => void;
  style?: CSSProperties;
  type?: 'submit' | 'button' | 'reset'
}

export default function Button({children, onClick, style, type}: ButtonProps) {
  return (
    <S.Button onClick={onClick} style={style} type={type}>
      {children}
    </S.Button>
  );
}
