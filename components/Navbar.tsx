import React, { useState } from "react";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { removefromStorage, client } from "../utils";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const [content, setContent] = useState("");
  const router = useRouter();

  const logout = () => {
    signOut(auth).then(() => {
      removefromStorage();
      router.push("/auth/login");
    });
  };
  const createPost = () => {
    if (content.replace(/\s/g, "").length === 0) {
      alert("Input value is invalid");
      return null;
    }

    const doc = {
      _type: "post",
      user: auth?.currentUser?.displayName,
      content,
      image: auth?.currentUser?.photoURL,
    };
    client.create(doc).then(() => {
      setContent("");
      router.reload();
    });
  };
  return (
    <div className="w-full px-[10vw] mb-8">
      <div className="w-full h-[10vh] flex justify-between items-center mb-8">
        <Link className="text-4xl font-bold font-courgette" href="/">
          Avio
        </Link>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-lg outline-none">
          Log Out
        </button>
      </div>
      <div className="w-full h-[10vh] grid place-items-center">
        <div className="w-3/5 flex justify-between items-center gap-2">
          <input
            className="w-full outline-none border-none bg-transparent"
            type="text"
            placeholder="What is on your mind?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded-lg outline-none"
            onClick={createPost}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
