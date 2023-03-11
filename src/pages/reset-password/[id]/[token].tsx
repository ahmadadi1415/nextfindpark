import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken"
import prisma from "lib/prisma";
import axios from "axios";
import { Field, Form, Formik, FormikValues } from "formik";


const ResetPassword: NextPage = ({ userExists, verified }: any) => {
    const { id, token } = useRouter().query

    const updatePassword = async (values: FormikValues, actions: any) => {
        actions.setSubmitting(false)
        const password = values.password
        const data = {
            id: id,
            password: password
        }

        console.log(data)

        const res = await axios.patch(`/api/users/${id}`,
            JSON.stringify(data),
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
        )

        console.log(res)
    }

    console.log(id, token)

    return (
        <>
            <div>
                {
                    (verified) ? (
                        <div>
                            <p>Verified</p>
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
                                                            placeholder="New Password"
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
                                                            placeholder="Your new password"
                                                        />
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <button type="submit">
                                            Change My Password
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    ) :

                        (
                            <div>
                                <p>Page Not Found</p>
                            </div>
                        )
                }

            </div>

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

