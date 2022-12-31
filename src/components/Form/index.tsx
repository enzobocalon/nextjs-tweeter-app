import * as S from './styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/dist/client/router';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
import { MdEmail, MdLock, MdPersonOutline, MdDriveFileRenameOutline } from 'react-icons/md';
import Button from '../Button';
import axios from 'axios';

interface Props {
  isRegister: boolean;
}

interface FormInput {
  username?: string,
  name?: string,
  email: string;
  password: string;
}

export default function Form({isRegister}: Props) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }} = useForm<FormInput>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleError = (type: string | undefined, inputType: string) => {
    return null;
  };

  const onSubmit: SubmitHandler<FormInput> = async ({email, password, username, name}) => {
    if (isRegister) {
      await axios.post('/api/auth/signup', {
        email, password, username, name
      }).then(response => {
        toast.success(response.data.message);
        router.push('/login');
      });
    } else {
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      }).then(data => {
        if (!data?.error) {
          toast.success('Logged. Redirecting...');
          router.push('/');
          return;
        }
        toast.error(data.error);
      });
    }
  };
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {
        isRegister &&
          <>
            <S.InputContainer>
              <MdPersonOutline size={24} color={'#828282'}/>
              <S.Input
                placeholder='Name'
                {...register('name', {required: true})}
                aria-invalid={errors.name ? 'true' : 'false'}/>
            </S.InputContainer>
            <S.Errors>{handleError(errors.name?.type, 'name')}</S.Errors>

            <S.InputContainer>
              <MdDriveFileRenameOutline size={24} color={'#828282'}/>
              <S.Input
                placeholder='Username'
                {...register('username', {required: true})}
                aria-invalid={errors.username ? 'true' : 'false'}/>
            </S.InputContainer>
            <S.Errors>{handleError(errors.username?.type, 'username')}</S.Errors>
          </>

      }
      <S.InputContainer>
        <MdEmail size={24} color={'#828282'}/>
        <S.Input
          placeholder='Email'
          {...register('email', {required: true, pattern: emailRegex})}
          aria-invalid={errors.email ? 'true' : 'false'}/>
      </S.InputContainer>
      <S.Errors>{handleError(errors.email?.type, 'email')}</S.Errors>

      <S.InputContainer>
        <MdLock size={24} color={'#828282'}/>
        <S.Input
          placeholder='Password'
          type='password' {...register('password', {required: true})}
          aria-invalid={errors.password ? 'true' : 'false'}/>
      </S.InputContainer>
      <S.Errors>{handleError(errors.password?.type, 'password')}</S.Errors>

      <Button type='submit'>Login</Button>

    </S.Form>
  );
}
