"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectschema, Subjectschema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
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
  } = useForm<Subjectschema>({
    resolver: zodResolver(subjectschema),
    defaultValues: data,
  });

  // After react 19 it'll be use action state

  const [state, formAction] = useFormState(
    type === "create" ? createSubject : updateSubject,
    { success: false, error: false }
  );

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    formAction(data);
  });

  // ensure latest data
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Subject has been ${type === "create" ? "created" : "updated"}`,
        { position: "top-right" }
      );
      setOpen(false);
      router.refresh(); //--> ensure data freshness. triggers a re-fetch of the data for the current route
    }
  }, [router, setOpen, state, type]);

  // --destructure the related data
  // const {teachers} = relatedData;
  const { teachers = [] } = relatedData || {};


  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Subject" : "Update the Subject"}
      </h1>

      <div className="flex gap-2 items-center justify-between flex-wrap">
        <InputField
          label="Subject Name"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors.name}
        />
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
          <label className="text-xs text-gray-500">Teachers</label>
          <select
            multiple
            {...register("teachers")}
            className="p-2 ring-[1.5px] ring-gray-400 rounded-md text-sm"
            defaultValue={data?.teachers}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.teachers?.message && (
            <p className="text-xs text-red-500">
              {errors.teachers.message.toString()}
            </p>
          )}
        </div>
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

export default SubjectForm;
