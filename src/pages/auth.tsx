import axios from "axios";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Auth: NextPage = ({ providers }: any) => {

    // Form changes based on AuthType, if Login show Login Form and vice versa
    const [authType, setAuthType] = useState("Login")
    const opAuthType: { [key: string]: string } = {
        Login: "Register",
        Register: "Login",
    }

    // For input value
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    // Create a Component ProvidersButtons
    const ProviderButtons = ({ providers }: any) => (
        <div>
            {Object.values(providers).map(
                (provider: any) =>
                    provider.name !== "Credentials" && (
                        <button
                            key={provider.name}
                            onClick={() => {
                                signIn(provider.id, {
                                    callbackUrl: "http://localhost:3000"
                                })
                            }}
                        >
                            <p>Sign In with {provider.name}</p>
                        </button>
                    )
            )}
        </div>
    )

    const redirectToHome = () => {
        const { pathname } = useRouter()
        if (pathname === "/login") useRouter().push('/')
    }

    const registerNewUser = async () => {
        const res = await axios.post("api/register", {
            email,
            password
        },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
        ).then(async () => {
            await loginUser()
            redirectToHome()
        }).catch(error => console.log(error))
    }

    const loginUser = async () => {
        const res: any = signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            callbackUrl: `${window.location.origin}`
        })

        res.error ? console.log(res.error) : redirectToHome()

    }

    const submitForm = (actions: any) => {
        actions.setSubmitting(false)
        authType === "Login" ? loginUser : registerNewUser
    }

    // const submitData = async (e: React.SyntheticEvent) => {
    //   e.preventDefault;

    //   try {
    //     const body = { email, password }

    //     await fetch('/api/login', {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(body)
    //     })
    //   } catch (err) {
    //     console.error(err)
    //   }
    // }


    // Front End Authentication Form

    return (
        <>
            <div>
                <div className="container">
                    <p className="text-2xl">
                        {authType === "Login" ? "Not registered?" : "Already have an account?"}
                    </p>
                    <button onClick={() => setAuthType(opAuthType[authType])}>
                        {opAuthType[authType]}
                    </button>
                </div>

                {/* For Sign In Button with Another Provider */}
                <div>
                    <ProviderButtons providers={providers}></ProviderButtons>
                </div>
                <Formik
                    initialValues={{}}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(_, actions) => {
                        submitForm(actions)
                    }}>
                    {(props) => (
                        <Form style={{ width: "100%" }}>
                            <div>
                                {/* Show Username Input if user want to register */}
                                {authType === "Register" && (
                                    <Field name="username">
                                        {() => (
                                            <div className="pb-5">
                                                <input 
                                                    type="text" 
                                                    className="rounded-lg w-96 text-black"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    placeholder="Username"
                                                 />
                                            </div>
                                        )}
                                    </Field>
                                )}
                                
                                <Field name="email">
                                        {() => (
                                            <div className="pb-5">
                                                <input 
                                                    type="email" 
                                                    className="rounded-lg w-96 text-black"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Email"
                                                 />
                                            </div>
                                        )}
                                </Field>
                                <Field name="password">
                                        {() => (
                                            <div className="pb-5">
                                                <input 
                                                    type="password" 
                                                    className="rounded-lg w-96 text-black"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Password"
                                                 />
                                            </div>
                                        )}
                                    </Field>
                            </div>
                                    <button type="submit">
                                        {authType}
                                    </button>
                        </Form>
                    )
                    }

                </Formik>
            </div>
        </>

    );

}

export default Auth

export async function getServerSideProps() {
    return {
        props: {
            providers: await getProviders()
        }
    }
}