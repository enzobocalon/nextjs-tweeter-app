import '../styles/_app.css';
import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
// import { TweetProvider } from '../contexts/TweetContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        {/* <TweetProvider> */}
        <Component {...pageProps} />
        <ToastContainer position='bottom-left'/>
        <GlobalStyle />
        {/* </TweetProvider> */}
      </SessionProvider>
    </>
  );
}
