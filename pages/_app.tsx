import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { CustomItems, CntrlProvider } from '@cntrl-site/sdk-nextjs';
import { LayoutsContext } from '../context/LayoutsContext';
import { SubscribeForm } from '../components/SubscribeForm';

CustomItems.define('subscribe-form', SubscribeForm);

function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const layouts = pageProps.project.layouts.sort((a, b) => a.startsWith - b.startsWith);
  return (
    <CntrlProvider>
      <LayoutsContext.Provider value={layouts}>
        <Component {...pageProps} />
      </LayoutsContext.Provider>
    </CntrlProvider>
  );
}

export default App;
