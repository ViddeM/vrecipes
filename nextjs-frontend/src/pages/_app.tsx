import '../resources/styles/globals.scss'
import '../resources/styles/source_sans_pro.scss'
import {appWithTranslation} from 'next-i18next';

import type {AppProps} from 'next/app'
import Head from "next/head";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Vrecipes</title>
                <link rel="icon" href="/vrecipes_logo.png"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}


export default appWithTranslation(MyApp);
