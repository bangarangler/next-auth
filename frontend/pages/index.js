import { signIn, signOut, useSession } from "next-auth/client";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      {!session && (
        <div>
          Not Signed in <br />
          <button onClick={signIn}>Sign in</button>
        </div>
      )}
      {session && (
        <div>
          <Head>
            <title>Next-Auth</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <>
            Signed in as {session.user.name ?? session.user.email} <br />
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name ?? session.user.email}
              />
            )}
            <button onClick={signOut}>Sign out</button>
          </>

          <main className={styles.main}></main>

          <footer className={styles.footer}>Footer here</footer>
        </div>
      )}
    </div>
  );
}
