"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { examSchema, ExamSchema, subjectschema, Subjectschema } from "@/lib/formValidationSchemas";
import { createExam, createSubject, updateExam, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ExamForm = ({
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
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  // After react 19 it'll be use action state

  const [state, formAction] = useFormState(
    type === "create" ? createExam : updateExam,
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
        `Exam has been ${type === "create" ? "created" : "updated"}`,
        { position: "top-right" }
      );
      setOpen(false);
      router.refresh(); //--> ensure data freshness. triggers a re-fetch of the data for the current route
    }
  }, [router, setOpen, state, type]);

  // --destructure the related data
  // const {teachers} = relatedData;
  const { lessons = [] } = relatedData || {};

  // const formattedStartTime = data?.startTime ? new Date(data.startTime).toISOString().slice(0, 16) : '';
  // const formattedEndTime = data?.endTime ? new Date(data.endTime).toISOString().slice(0, 16) : '';

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Exam" : "Update the Exam"}
      </h1>

      <div className="flex gap-2 items-center justify-between flex-wrap">
        <InputField
          label="Exam title"
          register={register}
          name="title"
          defaultValue={data?.title}
          error={errors.title}
        />
        <InputField
          label="Start date"
          register={register}
          name="startTime"
          defaultValue={data?.startTime}
          error={errors.startTime}
          type="datetime-local"
        />
        <InputField
          label="End date"
          register={register}
          name="endTime"
          defaultValue={data?.endTime}
          error={errors.endTime}
          type="datetime-local"
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
          <label className="text-xs text-gray-500">Lessons</label>
          <select
            {...register("lessonId")}
            className="p-2 ring-[1.5px] ring-gray-400 rounded-md text-sm"
            defaultValue={data?.teachers}
          >
            {lessons.map(
              (lesson: { id: number; name: string;  }) => (
                <option value={lesson.id} key={lesson.id}>
                  {lesson.name}
                </option>
              )
            )}
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-500">
              {errors.lessonId.message.toString()}
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

export default ExamForm;
