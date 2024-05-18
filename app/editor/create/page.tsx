"use client";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/configs/axiosConfig";
import { deleteFile, uploadFile } from "@/app/configs/firebaseStorage";
import { useState } from "react";
import Image from "next/image";
const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  let router = useRouter();
  type StateType = {
    url: string | undefined;
    path: string | undefined;
  };
  const [img, setImg] = useState<StateType | undefined>();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          await axiosInstance.post("/api/editor/create", data);
          router.push("/");
        } catch (e) {
          console.log(e);
        }
      })}
      className="w-full  flex flex-col items-center pb-4"
    >
      <span className="text-lg font-semibold">Write New Article</span>
      {img === undefined ? (
        <label className="form-control  w-8/12">
          <div className="label">
            <span className="label-text">Upload Article Header Image</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered  w-full"
            onChange={async (event) => {
              let files = event.target.files;
              if (files && files.length > 0) {
                let file = files[0];
                let path = `/headers/${file.name}`;
                let url = await uploadFile(path, file);
                setImg({ path, url });
              }
            }}
          />
        </label>
      ) : (
        <div className="flex justify-center items-top relative  w-8/12 h-96 overflow-clip">
          <img src={img!.url} className="absolute w-full " />
          <button
            className="btn btn-neutral ml-4 absolute bottom-5 right-5 z-10"
            onClick={() => {
              deleteFile(img!.path);
              setImg(undefined);
            }}
          >
            Remove
          </button>
        </div>
      )}

      <label className="form-control w-8/12">
        <div className="label">
          <span className="label-text">Id of Article</span>
        </div>
        <input
          type="text"
          {...register("articleId")}
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-8/12">
        <div className="label">
          <span className="label-text">Title of Article</span>
        </div>
        <input
          type="text"
          {...register("title")}
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </label>
      <label className="form-control w-8/12">
        <div className="label">
          <span className="label-text">Subtitle of Article</span>
        </div>
        <input
          type="text"
          {...register("subtitle")}
          placeholder="Type here"
          className="input input-bordered w-full "
        />
      </label>
      <label className="form-control w-8/12">
        <div className="label">
          <span className="label-text">Body of Article</span>
        </div>
        <Controller
          name="body"
          control={control}
          render={({ field }) => <SimpleMDE {...field} />}
        />
      </label>
      <div className=" w-2/12 flex justify-evenly">
        <button
          className="btn"
          onClick={() => {
            reset();
          }}
        >
          Clear
        </button>
        <button type="submit" className="btn btn-neutral">
          Save
        </button>
      </div>
    </form>
  );
};
export default Create;
