import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../resources/styles/Home.module.scss'
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vrecipes</title>
        <link rel="icon" href="/vrecipes_logo.png" />
      </Head>

      <main className={styles.main}>
        <Header />
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  )
}

export default Home
