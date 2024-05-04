"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
function Create() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  let router = useRouter();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        let response = axios.post("/api/article/create", data);
        router.push("/");
      })}
      className="w-full flex flex-col items-center pb-4"
    >
      <span className="text-lg font-semibold">Write New Article</span>
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
}
export default Create;
