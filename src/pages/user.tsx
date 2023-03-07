import { GetServerSideProps } from "next"
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {
    // const prisma = new PrismaClient()
    // let allUsers = await prisma.user.findUnique(
    //     {
    //         where: {
    //             id: "1"
    //         }
    //     }
    // )

    // const data = {
    //     id: allUsers?.id,
    //     created_at: allUsers?.createdAt,
    //     email: allUsers?.email,
    //     password: allUsers?.password
    // }

    // console.log(data)

    return {
        props: { }
    }
}

export default function User() {

  const { data: session } = useSession()
  console.log(session)
  const sess = useSession()
  console.log(sess)
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