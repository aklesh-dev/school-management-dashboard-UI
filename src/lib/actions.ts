"use server";

import { revalidatePath } from "next/cache";
import { Classschema, Subjectschema, Teacherschema } from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: Subjectschema
) => {
  // console.log(data.name + " in the server action.")
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: Subjectschema
) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((teacherId) => ({ id: teacherId })),
        },
      },
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};
export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

// -- Class server actions

export const createClass = async (
  currentState: CurrentState,
  data: Classschema
) => {
  try {
    await prisma.class.create({
      data
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: Classschema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

// -- Teacher server actions--

export const createTeacher = async (
  currentState: CurrentState,
  data: Teacherschema
) => {
  try {

    const clerk = await clerkClient();
    
    const user = await clerk.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {role: "teacher"},
    })
    
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || '',
        img: data.img || null,
        bloodGroup: data.bloodType,
        sex: data.sex,
        birthday: data.birthdate,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      }
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: Teacherschema
) => {

  if (!data.id) {
    return {success:false, error:true};
  }

  try {
    const clerk = await clerkClient();
    
    const user = await clerk.users.updateUser(data.id,{
      username: data.username,
      ...(data.password !== "" && {password:data.password}),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: {role: "teacher"},
    })
    
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && {password:data.password}),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || '',
        img: data.img || null,
        bloodGroup: data.bloodType,
        sex: data.sex,
        birthday: data.birthdate,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      }
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};