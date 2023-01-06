import React from "react";
import { IPost } from "../types";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

export default function Post(props: IPost) {
  return (
    <Link
      href={`/post/${props?._id}`}
      className="w-3/5 shadow-md rounded-lg p-2 flex justify-start items-start flex-col gap-2"
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            className="w-[35px] h-[35px] object-cover rounded-full"
            src={props?.image}
            alt={props?.user}
            width={40}
            height={40}
          />
          <p>{props?.user}</p>
        </div>
        <p className="text-sm text-gray-400">
          {moment(props?._createdAt).fromNow()}
        </p>
      </div>
      <p>{props?.content}</p>
    </Link>
  );
}
