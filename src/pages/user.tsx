import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next"

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
    const prisma = new PrismaClient()
    let allUsers = await prisma.user.findUnique(
        {
            where: {
                id: 1
            }
        }
    )

    const data = {
        id: allUsers?.id,
        name: allUsers?.name,
        created_at: allUsers?.createdAt.toString(),
        email: allUsers?.email,
        password: allUsers?.password
    }

    console.log(data)

    return {
        props: { data }
    }
}

export default function User({ data }: Data) {
    console.log(data)

    return (
        <>
            <div>{data.created_at}</div>
        </>
    )
}