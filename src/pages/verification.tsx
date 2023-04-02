import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Router from "next/router"

export default function Verification() {


    // Front End Account Verification
    const session = useSession()

    return (
        <>
            {
                (session.data?.user?.email) ? (
                    <div>
                        <Link href={"/login"}>Return to Homepage</Link>
                    </div>
                ) : (<div>Email not verified, please check your email</div>)
            }
        </>
    )
}