import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { Footer } from '@/components/footer';
import { Navbaradmin } from '@/components/navbaradmin';
import { Field, Form, Formik, FormikValues } from 'formik';
import axios from 'axios';
import { UserRole } from '@prisma/client';
import prisma from 'lib/prisma';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InferGetServerSidePropsType } from 'next';

interface ParkingLotData {
  id: number;
  name: string;
}

interface Props {
  parkingLotData: ParkingLotData[];
}
export default function addOperator({ parkingLotData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const addOperator = async (values: FormikValues, actions: any) => {
    console.log(values);
    const response = await axios.post('/api/auth/register', JSON.stringify(values), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    actions.resetForm();
  };

  return (
    <>
      <Head>
        <title>Tambah Operator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <Navbaradmin />
      <main className="min-h-screen bg-white">
        <div className="sm:flex">
          <div className="sm:min-h-screen px-4 py-4 lg:w-96 bg-gray-800">
            <ul className="space-y-2">
              <li>
                <a href="/admin/add-park" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Tambah Parkiran</span>
                </a>
              </li>
              <li>
                <a href="/admin/add-operator" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Tambah Operator</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:px-4 md:py-4 container">
            <div className="flex justify-center md:justify-start md:px-12 sm:rounded-xl bg-white drop-shadow-2xl">
              <div className="">
                <Formik
                  initialValues={{
                    fullname: '',
                    email: '',
                    password: '',
                    confirmationPassword: '',
                    parkingLotId: parkingLotData[0].id,
                    role: UserRole.operator,
                  }}
                  validateOnChange={true}
                  validateOnBlur={true}
                  validate={(values) => {
                    const errors: any = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                      errors.email = 'Invalid Email Address';
                    }
                    if (values.password.length < 8) {
                      errors.password = 'Password at least has 8 characters';
                    }
                    if (values.password && values.confirmationPassword) {
                      if (values.password !== values.confirmationPassword) {
                        errors.confirmationPassword = 'Password not matched';
                      }
                    }
                  }}
                  onSubmit={(values, actions) => {
                    console.log('Add new operator');
                    toast.success('Operator berhasil ditambahkan');
                    addOperator(values, actions);
                    console.log(values);
                  }}
                >
                  {(props) => (
                    <Form className="">
                      <Field name="fullname">
                        {() => (
                          <div>
                            <div className="py-4">
                              <label className=" w-36  text-black ">Nama Operator</label>
                            </div>
                            <div>
                              <input className="rounded-xl text-black w-80" type="text" name="fullname" value={props.values.fullname} onChange={props.handleChange} onBlur={props.handleBlur} placeholder="Nama Lengkap" />
                              {props.touched.fullname && props.errors.fullname && (
                                <div className="mt-3 inline-flex w-1/2 items-center rounded-lg bg-red-100 py-1 px-2 text-base text-red-700">
                                  <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                      <path
                                        fill-rule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  {props.errors.fullname}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="email">
                        {() => (
                          <div>
                            <div className="py-4 ">
                              <label className=" w-36  text-black ">Email</label>
                            </div>
                            <div>
                              <input className="rounded-xl text-black w-80" type="text" name="email" value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur} placeholder="Email" />
                              {props.touched.email && props.errors.email && (
                                <div className="mt-3 inline-flex w-1/2 items-center rounded-lg bg-red-100 py-1 px-2 text-base text-red-700">
                                  <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
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
                          </div>
                        )}
                      </Field>
                      <Field name="password">
                        {() => (
                          <div>
                            <div className="py-4 ">
                              <label className=" w-36  text-black ">Sandi</label>
                            </div>
                            <div>
                              <input className="rounded-xl text-black w-80" type="password" name="password" value={props.values.password} onChange={props.handleChange} onBlur={props.handleBlur} placeholder="Sandi" />
                              {props.touched.password && props.errors.password && (
                                <div className="mt-3 inline-flex w-1/2 items-center rounded-lg bg-red-100 py-1 px-2 text-base text-red-700">
                                  <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
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
                          </div>
                        )}
                      </Field>
                      <Field name="confirmationPassword">
                        {() => (
                          <div>
                            <div className="py-4 ">
                              <label className=" w-36  text-black ">Konfirmasi Sandi</label>
                            </div>
                            <div>
                              <input
                                className="rounded-xl text-black w-80"
                                type="password"
                                name="confirmationPassword"
                                value={props.values.confirmationPassword}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                placeholder="Konfirmasi"
                              />
                              {props.touched.confirmationPassword && props.errors.confirmationPassword && (
                                <div className="mt-3 inline-flex w-1/2 items-center rounded-lg bg-red-100 py-1 px-2 text-base text-red-700">
                                  <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                      <path
                                        fill-rule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                  {props.errors.confirmationPassword}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="parkingLotId">
                        {() => (
                          <div>
                            <div className="py-4 ">
                              <label className=" w-36 text-black ">Parkiran</label>
                            </div>
                            <div>
                              <select className="rounded-xl text-black w-80" name="parkingLotId" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.parkingLotId} placeholder="Nama Operator">
                                {parkingLotData.map((parkingLot) => {
                                  return <option value={parkingLot.id}>{parkingLot.name}</option>;
                                })}
                              </select>
                            </div>
                          </div>
                        )}
                      </Field>
                      <div className="flex sm:py-4 pt-4 pb-16">
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 rounded-full py-3 font-bold text-center w-44 h-12">
                          TAMBAH
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <form className="w-full px-12 "></form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
<ToastContainer />;
export async function getServerSideProps() {
  const parkingLotData = await prisma.parkingLot.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return {
    props: {
      parkingLotData,
    },
  };
}
