"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required " }),
  address: z.string().min(1, { message: "Address is required" }),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  birthdate: z.date({ message: "Birthdate is required" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema), defaultValues: data });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
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
          register={register}
          name="firstName"
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          register={register}
          name="lastName"
          error={errors.lastName}
        />
        <InputField
          label="Address"
          register={register}
          name="address"
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          register={register}
          name="bloodType"
          error={errors.bloodType}
        />
        <InputField
          type="phone"
          label="Phone"
          register={register}
          name="phone"
          error={errors.phone}
        />
        <InputField
          type="date"
          label="BirthDate"
          register={register}
          name="birthdate"
          error={errors.birthdate}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            {...register("sex")}
            className="p-2 ring-[1.5px] ring-gray-400 rounded-md text-sm"
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-500">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label htmlFor="img"  className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer">
            <Image src={"/upload.png"} alt="" width={28} height={28} />
            <span>Upload a Photo</span>
          </label>
          <input id="img" type="file" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-500">
              {errors.img.message.toString()}
            </p>
          )}
        </div>

        
      </div>

      <button className="bg-blue-500 p-2 rounded-md text-white">
        {type === "create" ? "create" : "update"}
      </button>
    </form>
  );
};

export default TeacherForm;
