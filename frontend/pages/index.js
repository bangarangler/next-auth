import { signIn, signOut, useSession } from "next-auth/client";
import { MeDocument, useMeQuery } from "../generated/graphql.tsx";
import { gql_endpoint } from "../constants.ts";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    signIn();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  console.log("SESSION", session);

  return (
    <div className={styles.container}>
      {!session && (
        <div>
          Not Signed in <br />
          <button onClick={handleLogin}>Sign in</button>
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
            <Link href="/profile">Profile</Link>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Sign out</button>
          </>

          <main className={styles.main}></main>

          <footer className={styles.footer}>Footer here</footer>
        </div>
      )}
    </div>
  );
}
