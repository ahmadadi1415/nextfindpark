import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { NextPage, InferGetServerSidePropsType } from "next";
import axios from "axios";
import { getProviders, signIn } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { use, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
const Login: NextPage = ({ providers }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  // Create a Component ProvidersButtons
  const ProviderButtons = ({ providers }: any) => (
    <div className="mt-5">
      {Object.values(providers).map(
        (provider: any) =>
          provider.name !== "Credentials" &&
          provider.name !== "Email" && (
            <button
              key={provider.name}
              onClick={async() => {
                const res = await signIn(provider.id, {
                  redirect: false,
                  callbackUrl: "/home",
                })

                res?.error ? toast.error(res.error) : redirectToHome()
              }}
            >
              <p className="text-black">Sign In with {provider.name}</p>
            </button>
          )
      )}
    </div>
  );

  // Front End Login Form
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>
        <main className="lg:p-36 px-2 flex items-center justify-between min-h-screen bg-white ">
          <div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validateOnChange={true}
              validateOnBlur={true}
              validate={(values) => {
                const errors: any = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid Email Address";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                return errors;
              }}
              onSubmit={(values, actions) => {
                console.log("onSubmit");
                loginUser(values, actions);
              }}
            >
              {(props) => (
                <Form>
                  <div>
                    <div>
                      <p className="text-5xl text-amber-900  pb-5 font-bold">
                        Halo!
                      </p>
                      <p className="text-xl text-black pb-7">
                        Kamu harus login dulu nih sebelum pakai app-nya
                      </p>
                    </div>

                    <Field name="email">
                      {() => (
                        <div className="pb-2">
                          <input
                            type="email"
                            name="email"
                            className="rounded-lg w-96 text-black"
                            value={props.values.email}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            placeholder="Email"
                          />
                          {props.touched.email && props.errors.email && (
                            <div className="mt-3 inline-flex w-1/2 items-center rounded-lg bg-red-100 py-1 px-2 text-base text-red-700">
                              <span className="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                              {props.errors.email}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>

                    <Field name="password">
                      {() => (
                        <div className="pb-2">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="rounded-lg w-96 text-black"
                            value={props.values.password}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            placeholder="Password"
                          />
                          {props.touched.password && props.errors.password && (
                            <div className="mt-3 inline-flex w-1/2 items-center rounded-lg bg-red-100 py-1 px-2 text-base text-red-700">
                              <span className="mr-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                              {props.errors.password}
                            </div>
                          )}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 pb-7">
                    <div className="text-black">
                      <p>
                        <input
                          className="form-checkbox rounded-full mr-3"
                          type="checkbox"
                          onClick={(e) =>
                            setShowPassword(e.currentTarget.checked)
                          }
                        />{" "}
                        Tampilkan Kata Sandi
                      </p>
                    </div>
                    <div className="text-gray-700 underline text-right ">
                      <Link href="/forgot-password">Lupa sandinya?</Link>
                    </div>
                    <p className="text-black text-right font-bold"></p>
                  </div>
                  <div>
                    <div className="bg-purple-800 rounded-lg font-bold text-center w-44 h-12">
                      <button className="py-3" type="submit">
                        Login
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div>
              <ProviderButtons providers={providers}></ProviderButtons>
            </div>
          </div>

          <div className="">
            <Image
              src="/tameng.png"
              width={270}
              height={0}
              alt="Picture of the author"
              className="scale-100  mr-24" // just an example
            />
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Login;

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  };
}

const redirectToHome = async() => {
  const router = Router;
  const { pathname } = router;
  const session = await getSession()
  const role = session?.user?.role
  if (pathname === "/login" && role) {

    if (role === "operator") {
      return router.push("/operators/dashboard")
    }

    else if (role === "admin") {
      return router.push("/admin/add-park")
    }

    else if (role === "user") {
      router.push("/home");
    }
  }
};

export const loginUser = async (values: FormikValues, actions: any) => {
  actions.setSubmitting(false);

  // If email is not verified, redirect to verification page
  // Else login using Credentials

  const loginInfo = await axios.post(
    "/api/auth/check-login",
    JSON.stringify(values),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  console.log(loginInfo);
  if (loginInfo.data.emailVerified === null) {
    // If the email is not verified, sign in using email first
    // then verify email after user click link

    console.log("not verified");

    // Redirect to verification page
    if (loginInfo.data.hasVerifToken === false) {
      const res: any = await signIn("email", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: `${window.location.origin}`,
      });

      res.error
        ? toast.error(res.error)
        : toast.info("Harap cek email verifikasi anda");
    } else {
      toast.info("Harap cek email verifikasi anda");
      console.log("Please check your email");
    }
  } else {
    // If the email is verified, sign in using credentials
    console.log("verified");
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });

    console.log(res);
    res?.error ? toast.error(res.error) : redirectToHome();
  }
};
