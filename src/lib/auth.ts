import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const hashedPassowrd = await hash(password, 12);
  return hashedPassowrd;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
