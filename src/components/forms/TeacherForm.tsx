"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { teacherschema, Teacherschema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

const TeacherForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Teacherschema>({
    resolver: zodResolver(teacherschema),
  });

  const [img, setImg] = useState<any>(); //--image store hook.

  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    { success: false, error: false }
  );

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    formAction({ ...data, img: img?.secure_url });
  });

  // ensure latest data
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Teacher has been ${type === "create" ? "created" : "updated"}`,
        { position: "top-right" }
      );
      setOpen(false);
      router.refresh(); //--> ensure data freshness. triggers a re-fetch of the data for the current route
    }
  }, [router, setOpen, state, type]);

  // --destructure the related data
  const { subjects } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : " Update the teacher"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex gap-2 items-center justify-between flex-wrap">
        <InputField
          label="Username"
          register={register}
          name="username"
          error={errors.username}
        />
        <InputField
          type="email"
          label="Email"
          defaultValue={data?.email}
          register={register}
          name="email"
          error={errors.email}
        />
        <InputField
          type="password"
          label="Password"
          register={register}
          name="password"
          error={errors.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between gap-2 flex-wrap">
        <InputField
          label="First Name"
          defaultValue={data?.name}
          register={register}
          name="name"
          error={errors.name}
        />
        <InputField
          label="Last Name"
          defaultValue={data?.surname}
          register={register}
          name="surname"
          error={errors.surname}
        />
        <InputField
          label="Address"
          defaultValue={data?.address}
          register={register}
          name="address"
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          defaultValue={data?.bloodGroup}
          register={register}
          name="bloodType"
          error={errors.bloodType}
        />
        <InputField
          type="phone"
          label="Phone"
          defaultValue={data?.phone}
          register={register}
          name="phone"
          error={errors.phone}
        />
        <InputField
          type="date"
          label="BirthDate"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          register={register}
          name="birthdate"
          error={errors.birthdate}
        />
        {/* --if there is data then update.-- */}
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="p-2 ring-[1.5px] ring-gray-400 rounded-md text-sm"
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-500">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            multiple
            {...register("subjects")}
            className="p-2 ring-[1.5px] ring-gray-400 rounded-md text-sm"
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-500">
              {errors.subjects.message.toString()}
            </p>
          )}
        </div>

        <CldUploadWidget
          uploadPreset="school"
          onSuccess={(result, { widget }) => {
            // console.log(result)
            setImg(result.info); //--
            widget.close(); //--close the widget after img upload success.
          }}
          
        >
          {({ open }) => {
            return (
              <label
                htmlFor="img"
                defaultValue={data?.img}
                onClick={() => open()}
                className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
              >
                <Image src={"/upload.png"} alt="" width={28} height={28} />
                <span>Upload a Photo</span>
              </label>
            );
          }}
        </CldUploadWidget>
      </div>

      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <button className="bg-blue-500 p-2 rounded-md text-white">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default TeacherForm;
