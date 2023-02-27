import axios from "axios";
import { Formik } from "formik";
import { NextPage } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Auth: NextPage = ({ providers }: any) => {

  const { data: session } = useSession()

  // Form changes based on AuthType, if Login show Login Form and vice versa
  const [authType, setAuthType] = useState("Login")
  const opAuthType: { [key: string]: string } = {
    Login: "Register",
    Register: "Login",
  }

  // For input value
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
                  callbackUrl: `${process.env.URL_DEV}`
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

  const submitForm = () => {
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
          onSubmit={() => {
            submitForm()
          }}
        />
      </div>
    </>

  );

}

export async function getServerSideProps() {
    return {
        props: {
            providers: await getProviders()
        }
    }
}