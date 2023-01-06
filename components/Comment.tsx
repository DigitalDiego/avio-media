import React from "react";
import { IComment } from "../types";
import moment from "moment";
import Image from "next/image";

export default function Comment(props: IComment) {
  return (
    <div className="w-full flex justify-start items-start gap-2 flex-col p-2 rounded-lg shadow-md">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            className="w-[35px] h-[35px] rounded-full object-cover"
            src={props?.image}
            alt={"Image of " + props?.user}
            width={40}
            height={40}
          />
          <p>{props?.user}</p>
        </div>
        <p className="text-sm text-gray-400">
          {moment(props?._createdAt).fromNow()}
        </p>
      </div>
      <p>{props?.comment}</p>
    </div>
  );
}
