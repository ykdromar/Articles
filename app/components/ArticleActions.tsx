"use client";
import React from "react";
import { GoBookmark, GoHeart, GoShareAndroid } from "react-icons/go";
import {
  TwitterShareButton,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  XIcon,
} from "react-share";
import { IoIosLink } from "react-icons/io";
export const ArticleActions = ({ likes, link }: any) => {
  return (
    <div className="border-solid border-y-2 mt-3 p-3 flex justify-between  items-center mb-5">
      <div className="flex-auto flex items-center ">
        <span className="mx-1">{likes.length}</span>
        <GoHeart size={20} />
        <span className="mx-1">Likes</span>
      </div>
      <GoShareAndroid
        size={20}
        onClick={() => document.getElementById("share_modal")!.showModal()}
      />
      <dialog id="share_modal" className="modal">
        <div className="modal-box flex flex-col ">
          <div className="text-lg font-semibold">Share this article</div>
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full my-3 pr-10"
              readOnly
              defaultValue={link}
            />
            <IoIosLink
              size={20}
              onClick={async () => {
                await navigator.clipboard.writeText(link);
              }}
              className=" absolute  rounded-full right-3 top-6 hover:text-slate-500 active:translate-y-1 ease-in-out focus:translate-y-1"
            />
          </div>
          <div className="w-full flex justify-evenly">
            <EmailShareButton url={link}>
              <EmailIcon size={40} />
            </EmailShareButton>
            <WhatsappShareButton url={link}>
              <WhatsappIcon size={40} />
            </WhatsappShareButton>
            <TwitterShareButton url={link}>
              <XIcon size={40} />
            </TwitterShareButton>
            <FacebookShareButton url={link}>
              <FacebookIcon size={40} />
            </FacebookShareButton>
            <LinkedinShareButton url={link}>
              <LinkedinIcon size={40} />
            </LinkedinShareButton>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
