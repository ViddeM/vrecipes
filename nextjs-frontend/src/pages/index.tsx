import type {NextPage} from 'next'
import Head from 'next/head'
import Header from "../components/Header";
import styles from "./index.module.scss";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vrecipes</title>
        <link rel="icon" href="/vrecipes_logo.png"/>
      </Head>

      <main className={styles.main}>
        <Header/>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
  if (!locale) {
    return {props: {}};
  }

  const fs = require('fs');
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};


export default Home
