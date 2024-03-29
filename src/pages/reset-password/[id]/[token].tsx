import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken"
import prisma from "lib/prisma";
import axios from "axios";
import { Field, Form, Formik, FormikValues } from "formik";
import Head from "next/head";
import Navbar from "@/components/navbar";
import Image from "next/image";


const ResetPassword: NextPage = ({ userExists, verified }: any) => {
    const router = useRouter()
    const { id, token } = router.query

    const updatePassword = async (values: FormikValues, actions: any) => {
        actions.setSubmitting(false)
        const password = values.password
        const data = {
            id: id,
            password: password,
            token: token
        }

        console.log(data)

        const res = await axios.patch(`/api/users/${id}/reset-password`,
            JSON.stringify(data),
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
        )

        console.log(res)
        
        if (res.status === 200) {
            router.push("/login")
        }
    }

    console.log(id, token)

    return (
        <>
            <Navbar />
            <Head>
                <title>Change Password</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="p-36 flex items-center justify-between flex-col-2 min-h-screen bg-white">
                <div>
                    <div>
                        <p className="text-5xl text-amber-900 pb-5 font-bold">
                            {
                                (verified) ? "Buat Sandi Baru" : "Halaman Tidak Ditemukan"
                            }
                        </p>
                        <p className="text-xl text-black pb-7">
                            {
                                (verified) ? "Jangan lupa lagi yaa..." : "Sepertinya link reset password ini sudah kadaluarsa."}
                        </p>
                    </div>
                    {
                        (verified) && (
                            <div>

                                <Formik
                                    initialValues={{ password: '', confirmation: '' }}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    onSubmit={(values, actions) => {
                                        console.log("onSubmit")
                                        updatePassword(values, actions)
                                    }}>
                                    {(props) => (
                                        <Form style={{ width: "100%" }}>
                                            <div>
                                                <Field name="password">
                                                    {() => (
                                                        <div className="pb-5">
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                className="rounded-lg w-96 text-black"
                                                                value={props.values.password}
                                                                onChange={props.handleChange}
                                                                placeholder="Sandi baru"
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                                <Field name="confirmation">
                                                    {() => (
                                                        <div className="pb-5">
                                                            <input
                                                                type="password"
                                                                name="confirmation"
                                                                className="rounded-lg w-96 text-black"
                                                                value={props.values.confirmation}
                                                                onChange={props.handleChange}
                                                                placeholder="Konfirmasi sandi"
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                            </div>
                                            <div className="bg-purple-800 rounded-lg font-bold text-center w-44 h-12">
                                                <button className="py-3" type="submit">
                                                    Ganti Password
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        )
                    }

                </div>
                <div>
                    <Image
                        src="/kunci.png"
                        alt="Picture of the author"
                        width="270"
                        height="0"
                        objectFit="cover" // change to suit your needs
                        className="scale-100  mr-24" // just an example
                    />
                </div>
            </main>
        </>
    )
}

export default ResetPassword

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id, token } = context.query

    const user = await prisma?.user.findUnique({
        where: {
            id: id as string
        }
    })

    let verified = false

    if (user) {
        const secret = process.env.JWT_SECRET ?? + !user.password
        let verify = null

        try {
            verify = jwt.verify(token as string, secret as jwt.Secret)
        } catch (error) {
            console.log(error)
        }

        verified = (verify) ? true : false
    }

    return {
        props: {
            userExists: (!user) ? false : true,
            verified: verified
        }
    }
}

