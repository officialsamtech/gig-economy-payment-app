import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { checkTokenExpiration } from '@/utils/auth';
import { useEffect } from 'react';



export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!checkTokenExpiration()) {
      router.push('/auth/signin');
    }
  }, []);

  return <Component {...pageProps} />
}
