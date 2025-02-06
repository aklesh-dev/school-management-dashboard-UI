"use server";

import { revalidatePath } from "next/cache";
import { Subjectschema } from "./formValidationSchemas";
import prisma from "./prisma";

type CurrentState = { success: boolean, error: boolean};

export const createSubject = async (currentState:CurrentState, data: Subjectschema) => {
  // console.log(data.name + " in the server action.")
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      },
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/subjects");
    return {success:true, error: false};
  } catch (error) {
    console.error(error);
    return {success:false, error:true};
  }
};
export const updateSubject = async (currentState:CurrentState, data: Subjectschema) => {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name:data.name,
      },
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/subjects");
    return {success:true, error: false};
  } catch (error) {
    console.error(error);
    return {success:false, error:true};
  }
};
export const deleteSubject = async (currentState:CurrentState, data: FormData) => {
  const id = data.get("id") as string
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });

    return {success:true, error: false};
  } catch (error) {
    console.error(error);
    return {success:false, error:true};
  }
};
