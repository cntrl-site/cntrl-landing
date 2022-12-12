import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { CustomItems, CntrlProvider } from '@cntrl-site/sdk-nextjs';
import { SubscribeForm } from '../components/SubscribeForm';

CustomItems.define('subscribe-form', SubscribeForm);

function App({ Component, pageProps }: AppProps) {
  return (
    <CntrlProvider>
      <Component {...pageProps} />
    </CntrlProvider>
  );
}

export default App;
