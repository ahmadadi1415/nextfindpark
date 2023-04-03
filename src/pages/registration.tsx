import Head from "next/head";
import Image from "next/image";
import Navbar  from "@/components/navbar";
import { Footer } from "@/components/footer";
import Router from "next/router";
import { Field, Form, Formik, FormikValues } from "formik";
import axios from "axios";
import { loginUser } from "./login";

export default function Registration() {
  const redirectToVerification = () => {
    const router = Router;
    const { pathname } = router;
    if (pathname === '/registration') {
      router.push('/verification');
    }
  };

	const registerNewUser = async (values: FormikValues, actions: any) => {
		const res = await axios.post("/api/auth/register",
			JSON.stringify(values),
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
			}
		).then(async () => {
			// Login user after registering
			await loginUser(values, actions)
			redirectToVerification()
			
		}).catch(error => console.log(error))
	}

  // Front End Registration Form

	return (
		<>
			<Navbar />
			<Head>
				<title>Register</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<main className="p-36 flex items-center justify-between flex-col-2 min-h-screen bg-white">
					<Formik
						initialValues={{ username: '', fullname: '', email: '', password: '', confirmation: '' }}
						validateOnChange={false}
						validateOnBlur={false}
						
						validate={ values => {
							const errors: any = {}
							if (!values.email) {
								errors.email = "Required"
							}
							else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
								errors.email = "Invalid Email Address"
							}
							// if (!values.username) {
							// 	errors.username = "Required"
							// }
							if (values.password.length < 8) {
								errors.password = "Password at least has 8 characters"
							}
							else if (values.confirmation !== values.password) {
								errors.confirmation == "Confirmation password is different with password"
							}
							return errors
							}
						}
						onSubmit={(values:any, actions: any) => {
							console.log("onSubmit")
							registerNewUser(values, actions)
						}}>
						{(props) => (
							<Form>
								<div>
									<div>
										<p className="text-5xl text-amber-900 pb-5 font-bold">
											Belum punya akun?
										</p>
										<p className="text-xl text-black pb-7">Isi form dibawah</p>
									</div>
									<Field name="fullname">
										{() => (
											<div className="pb-5">
												<input
													type="text"
													name="fullname"
													className="rounded-lg w-96 text-black"
													value={props.values.fullname}
													onChange={e => props.handleChange(e)}
													placeholder="Nama Lengkap"
												/>
											</div>
											)
										}	
									</Field>
									{/* <Field name="username">
										{() => (
											<div className="pb-5">
												<input
													type="text"
													name="username"
													className="rounded-lg w-96 text-black"
													value={props.values.username}
													onChange={e => props.handleChange(e)}
													placeholder="Username"
												/>
											</div>
											)
										}	
									</Field> */}
									<Field name="email">
										{() => (
											<div className="pb-5">
												<input
													type="email"
													name="email"
													className="rounded-lg w-96 text-black"
													value={props.values.email}
													onChange={e => props.handleChange(e)}
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
													name="password"
													className="rounded-lg w-96 text-black"
													value={props.values.password}
													onChange={e => props.handleChange(e)}
													placeholder="Sandi"
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
													onChange={e => props.handleChange(e)}
													placeholder="Konfirmasi sandi"
												/>
											</div>
										)}
									</Field>
									{/* <div className="grid grid-cols-3 pb-7">
										<div>
											<p className="text-black font-bold">
												<input type="checkbox" /> Tampilkan kata sandi
											</p>
										</div>
									</div> */}
                </div>
                <div className="bg-purple-800 rounded-lg font-bold text-center w-44 h-12">
                  <button className="py-3" type="submit">
                    Daftar
                  </button>
                </div>
              </Form>
            )}
          </Formik>

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
      </div>
      <Footer />
    </>
  );
}
