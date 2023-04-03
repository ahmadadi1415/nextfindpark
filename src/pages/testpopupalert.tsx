import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import swal from "@sweetalert/with-react";

swal(
  <div>
    <h1>Hello world!</h1>
    <p>This is now rendered with JSX!</p>
  </div>
);

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
