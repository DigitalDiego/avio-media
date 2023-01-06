import React from "react";
import { auth, provider } from "../../firebase.config";
import { signInWithPopup } from "firebase/auth";
import { saveToStorage } from "../../utils";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Auth() {
  const router = useRouter();

  const login = () => {
    signInWithPopup(auth, provider).then((result) => {
      saveToStorage("isAuth", true);
      router.push("/");
    });
  };

  return (
    <>
      <Head>
        <title>Avio | Login</title>
      </Head>
      <div className="w-full h-screen flex">
        <div className="relative hidden lg:inline w-1/2 h-full">
          <Image
            className="w-full h-full object-cover"
            src="/images/login-image.jpg"
            alt="login image"
            width={1000}
            height={1000}
          />
          <div className="absolute top-0 right-0 w-full h-full bg-black/80 grid place-items-center">
            <p className="font-courgette text-white text-7xl">Avio</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full grid place-items-center">
          <div className="flex justify-center items-center flex-col gap-2 w-4/5">
            <p className="text-center text-4xl lg:text-5xl font-bold">
              Welcome to Avio
            </p>
            <p className="text-sm text-center w-4/5 2xl:w-2/5">
              Join today to meet and interact with like minded people about your
              similar interests.
            </p>
            <button
              className="px-4 py-2 bg-teal-500 text-white rounded-lg outline-none"
              onClick={login}
            >
              Login in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
