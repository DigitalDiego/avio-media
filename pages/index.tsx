import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { client, getFromStorage } from "../utils";
import Head from "next/head";
import { fetchPosts } from "../utils";
import { IPost } from "../types";
import { Post } from "../components";

interface IProps {
  posts: IPost[];
}

export default function Home({ posts }: IProps) {
  const user = getFromStorage("isAuth");
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, []);
  return (
    <>
      <Head>
        <title>Avio</title>
      </Head>
      <div className="w-full flex justify-start items-center flex-col gap-8 px-[10vw]">
        {posts?.map((post) => (
          <Post {...post} key={post?._id} />
        ))}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const posts = await client.fetch(fetchPosts);

  return {
    props: {
      posts,
    },
  };
};
