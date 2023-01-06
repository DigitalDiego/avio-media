import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navbar } from "../components";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      {router.pathname !== "/auth/login" && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
