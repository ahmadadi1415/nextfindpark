import axios from "axios"
import { Field, Form, Formik, FormikValues } from "formik"
import { NextPage } from "next"

const ForgotPassword: NextPage = () => {

    const forgotPassword = async (values: FormikValues, actions: any) => {
        actions.setSubmitting(false)

        const res = await axios.post("api/auth/forgot-password",
            JSON.stringify(values),
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            }
        ).catch(error => console.log(error))
        console.log(res)
    }

    return (
        <>
            <div>
                <Formik
                    initialValues={{ email: '' }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values, actions) => {
                        console.log("onSubmit")
                        forgotPassword(values, actions)
                    }}>
                    {(props) => (
                        <Form style={{ width: "100%" }}>
                            <div>

                                <Field name="email">
                                    {() => (
                                        <div className="pb-5">
                                            <input
                                                type="email"
                                                name="email"
                                                className="rounded-lg w-96 text-black"
                                                value={props.values.email}
                                                onChange={props.handleChange}
                                                placeholder="Email"
                                            />
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <button type="submit">
                                Send Reset Password
                            </button>
                        </Form>
                    )}

                </Formik>
            </div>
        </>
    )
}

export default ForgotPassword