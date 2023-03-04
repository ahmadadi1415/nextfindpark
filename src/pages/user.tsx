import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next"
import { signIn, signOut, useSession } from "next-auth/react";

interface Data {
    data: {
        id: String,
        name: String,
        created_at: String,
        email: String,
        password: String
    }
}

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
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}