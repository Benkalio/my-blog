import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
