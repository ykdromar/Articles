"use client";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { convertString } from "@/app/utils/strings";
import { axiosInstance } from "@/app/core/api/axiosConfig";
import { deleteFile, uploadFile } from "@/app/core/configs/firebaseStorage";
import EditorAPI from "@/app/core/api/editorAPI";
const Edit = ({ params }: { params: { articleId: string } }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  let watchArticleId = watch("articleId");

  let { articleId } = params;
  const { updateAnArticle } = EditorAPI();
  const getArticle = async (articleId: string) => {
    try {
      let res = await axiosInstance.get(`/api/editor/article/${articleId}`);
      let body = res.data.body;
      console.log(res);
      reset(body);
      setImg(body.headerImg);
      setImages(body.images ?? []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getArticle(articleId);
  }, []);

  useEffect(() => {
    if (watchArticleId != undefined) {
      const transformed = convertString(watchArticleId);
      if (transformed !== watchArticleId) {
        setValue("articleId", transformed);
      }
    }
  }, [watchArticleId]);

  let router = useRouter();

  type StateType = {
    url: string | undefined;
    path: string | undefined;
  };
  const [img, setImg] = useState<StateType | undefined>();
  const [images, setImages] = useState<any>([]);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          let resData = await updateAnArticle({
            ...data,
            headerImg: img,
            images,
          });
          if (resData.success) {
            router.push("/editor/dashboard");
          }
        } catch (e) {
          console.log(e);
        }
      })}
      className="w-full  flex flex-col items-center pb-4"
    >
      <span className="text-lg font-semibold">Edit Article</span>
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
      <span className="text-left my-3 w-8/12 text-sm">Upload Images</span>
      <div className="w-8/12 flex justify-center items-center flex-wrap my-3">
        {images.map((img: any, i: any) => (
          <img
            key={i}
            src={img!.url}
            onClick={async () => {
              await navigator.clipboard.writeText(img!.url);
            }}
            onDoubleClick={() => {
              deleteFile(img!.path);
              let newImages = images.filter(
                (i: { path: any }) => i.path !== img.path
              );
              setImages(newImages);
            }}
            className="h-28 m-2  "
          />
        ))}
        <input
          type="file"
          multiple
          className="file-input file-input-bordered  w-56"
          onChange={async (event) => {
            let files = event.target.files;
            if (files && files.length > 0) {
              let newImgs = [];
              for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let path = `/images/${file.name}`;
                let url = await uploadFile(path, file);
                let newImg = {
                  path,
                  url,
                };
                newImgs.push(newImg);
              }
              setImages([...images, ...newImgs]);
            }
          }}
        />
      </div>
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

export default Edit;
