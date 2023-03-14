import { GetServerSideProps } from "next"
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {

    return {
        props: { }
    }
}

export default function User() {

  const { data: session } = useSession()
  console.log(session)
  
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => Router.push('/auth')}>Sign in</button>
    </>
  )
}