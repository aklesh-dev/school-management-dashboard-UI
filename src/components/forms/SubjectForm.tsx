"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectschema, Subjectschema } from "@/lib/formValidationSchemas";
import { createSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({
  type,
  data,
  setOpen
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>
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

  const [state, formAction] = useFormState(createSubject, {success:false, error:false})

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    formAction(data);
  });

  // ensure latest data 
  const router = useRouter();

  useEffect(()=>{
    if(state.success){
      toast.success(`Subject has been ${type === 'create' ? 'created' : 'updated'}`,{position:"top-right"});
      setOpen(false);
      router.refresh();  //--> ensure data freshness. triggers a re-fetch of the data for the current route
    }
  },[router, setOpen, state, type]);

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
      </div>
      {state.error && <span className="text-red-500">Something went wrong!</span>}
      <button className="bg-blue-500 p-2 rounded-md text-white">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default SubjectForm;
