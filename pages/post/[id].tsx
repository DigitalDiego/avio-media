import React, { useState } from "react";
import { fetchComments, fetchPost, client } from "../../utils";
import Image from "next/image";
import moment from "moment";
import { IPost, IComment } from "../../types";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { auth } from "../../firebase.config";
import { useRouter } from "next/router";
import { Comment } from "../../components";

interface IProps {
  post: IPost[];
  comments: IComment[];
}

export default function Post({ post, comments }: IProps) {
  const [comment, setComment] = useState("");
  const router = useRouter();
  console.log(comments);

  const createComment = () => {
    if (comment.replace(/\s/g, "").length === 0) {
      alert("Input value in invalid");
      return null;
    }
    const doc = {
      _type: "comment",
      user: auth?.currentUser?.displayName,
      image: auth?.currentUser?.photoURL,
      comment,
      postId: post[0]?._id,
    };
    client.create(doc).then(() => {
      setComment("");
      router.reload();
    });
  };
  return (
    <>
      <Head>
        <title>Avio | {post[0]?.content}</title>
      </Head>
      <div className="w-full flex justify-start items-center gap-8 flex-col px-[10vw] pb-8">
        <div className="w-3/5 flex flex-col gap-8">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                className="w-[35px] h-[35px] rounded-full object-cover"
                src={post[0]?.image}
                alt={post[0]?.user}
                width={40}
                height={40}
              />
              <p>{post[0]?.user}</p>
            </div>
            <p className="text-sm text-gray-400">
              {moment(post[0]?._createdAt).fromNow()}
            </p>
          </div>
          <div className="w-full flex justify-start items-start min-h-[40vh]">
            <p>{post[0]?.content}</p>
          </div>
          <div className="w-full flex justify-between items-center gap-2">
            <input
              className="w-full outline-none border-none"
              type="text"
              placeholder="Comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button
              className="px-4 py-2 bg-teal-500 text-white rounded-lg"
              onClick={createComment}
            >
              Post
            </button>
          </div>
          {comments?.map((comment) => (
            <Comment {...comment} key={comment?._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  const post = await client.fetch(fetchPost(id));
  const comments = await client.fetch(fetchComments(id));

  return {
    props: {
      post,
      comments,
    },
  };
};
