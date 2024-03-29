import "@/styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HydrationOverlay>
      <SessionProvider session={pageProps.session}>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Component {...pageProps} />
      </SessionProvider>
    </HydrationOverlay>
  );
}
