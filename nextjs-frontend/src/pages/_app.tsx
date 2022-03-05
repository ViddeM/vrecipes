import '../resources/styles/globals.scss'
import '../resources/styles/source_sans_pro.scss'
import {appWithTranslation} from 'next-i18next';

import type {AppProps} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp);
