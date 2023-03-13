import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
export default function Aboutus() {
  return (
    <>
      <Navbar />
      <div class="bg-white flex flex-nowrap">
        <div>01</div>
        <div>02</div>
        <div>03</div>
      </div>
      <Footer />
    </>
  );
}
