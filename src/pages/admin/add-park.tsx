import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { Footer } from '@/components/footer';
import { Navbaradmin } from '@/components/navbaradmin';
import { Field, Form, Formik, FormikValues } from 'formik';
import { resizeImage } from '@/utils/image-resizer';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MapsInput = dynamic(() => import('@/components/mapinput'), {
  ssr: false,
});

export default function addPark(props: any) {
  const [localImg, setLocalImg] = useState();
  const [image, setImage] = useState<any>();
  const [coords, setCoords] = useState({ lat: '', lng: '' });
  const coordsInput = useRef<any>();

  // Handle file image from admin
  const handleImage = async (e: any) => {
    const reader = new FileReader();
    // Resize the image
    await resizeImage(e.target.files[0], 1080, 1080).then((blob) => {
      setLocalImg(blob as any);
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        setImage(reader.result as any);
      };
    });
  };

  async function uploadData(values: FormikValues, actions: any) {
    const response = await axios.post('/api/parkinglots', JSON.stringify(values), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    actions.setSubmitting(false);
    console.log(response);
    actions.resetForm();
  }

  useEffect(() => {
    // console.log(coords)
    const { lat, lng } = coords;
    coordsInput.current.value = `${lat}, ${lng}`;
  }, [coords]);

  return (
    <>
      <Head>
        <title>Tambah Parkiran</title>
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
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
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
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
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

          <div className="md:px-4 md:py-4 container ">
            <div className="flex justify-center md:justify-start px-2 md:px-12 sm:rounded-xl bg-white drop-shadow-2xl">
              <Formik
                initialValues={{
                  name: '',
                  description: '',
                  location: '',
                  latitude: '',
                  longitude: '',
                  hourlyFee: 0,
                  image: '',
                }}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                  console.log('Add new parking lot');
                  toast.success('Tempat Parkir berhasil ditambahkan');

                  const { lat, lng } = coords;
                  values.latitude = lat;
                  values.longitude = lng;
                  values.image = image;

                  console.log(values);
                  uploadData(values, actions);
                }}
              >
                {(props) => (
                  <Form autoComplete="off">
                    <Field name="name">
                      {() => (
                        <div className="flex py-4 ">
                          <label className="w-36 flex items-center text-black">Nama Tempat</label>
                          <input className="rounded-xl text-black w-80" type="text" placeholder="Nama Tempat Parkir" name="name" value={props.values.name} onChange={props.handleChange} />
                        </div>
                      )}
                    </Field>
                    <Field name="description">
                      {() => (
                        <div className=" flex py-4">
                          <label className="w-36 flex items-center text-black ">Deskripsi Parkiran</label>
                          <textarea className="rounded-xl text-black w-80" placeholder="Deskripsi Singkat" name="description" value={props.values.description} onChange={props.handleChange} />
                        </div>
                      )}
                    </Field>
                    <Field name="location">
                      {() => (
                        <div className="flex py-4">
                          <label className=" w-36 flex items-center text-black">Lokasi & Alamat</label>
                          <textarea className="rounded-xl text-black w-80" placeholder="Di dekat ..., Jl. ..." name="location" value={props.values.location} onChange={props.handleChange} />
                        </div>
                      )}
                    </Field>
                    <Field name="hourlyFee">
                      {() => (
                        <div className="flex py-4">
                          <label className=" w-36 text-black flex items-center">Biaya/jam</label>
                          <input className="rounded-xl text-black w-80" type="number" placeholder="2000" name="hourlyFee" value={props.values.hourlyFee} onChange={props.handleChange} />
                        </div>
                      )}
                    </Field>

                    <Field name="coordinates">
                      {() => (
                        <div className="block py-4">
                          <label className=" w-36 inline-block text-black text-left pb-2">Lokasi</label>
                          <div className="container rounded-xl pb-2">
                            <MapsInput onChange={setCoords} />
                          </div>
                          <input className="rounded-xl text-black w-full" type="text" placeholder="Koordinat tempat" readOnly={true} name="coordinates" value={''} onChange={props.handleChange} ref={coordsInput} />
                        </div>
                      )}
                    </Field>
                    <Field>
                      {() => (
                        <div className="flex justify-between py-4">
                          <label className="w-36 flex items-center sm:justify-center text-black">Upload Foto</label>
                          <input className="min-w-0 flex-auto rounded border border-solid border-black text-black" type="file" id="formFile" onChange={handleImage} />
                        </div>
                      )}
                    </Field>

                    <div className="block py-4 ">
                      <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 rounded-full py-3 font-bold text-center w-44 h-12">
                        TAMBAH
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
