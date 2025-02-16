"use server";

import { revalidatePath } from "next/cache";
import {
  Classschema,
  ExamSchema,
  StudentSchema,
  Subjectschema,
  Teacherschema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { getRoleAndUserId } from "./utils";

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
      data,
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
      data,
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
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img || null,
        bloodGroup: data.bloodType,
        sex: data.sex,
        birthday: data.birthdate,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
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
    return { success: false, error: true };
  }

  try {
    const clerk = await clerkClient();

    const user = await clerk.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img || null,
        bloodGroup: data.bloodType,
        sex: data.sex,
        birthday: data.birthdate,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
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
    // --delete user from clerk
    const clerk = await clerkClient();
    clerk.users.deleteUser(id);
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

// -- Student server actions--

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  try {
    // Class capacity
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });

    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }

    // if space is avaiable add new student

    const clerk = await clerkClient();

    const user = await clerk.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img || null,
        bloodGroup: data.bloodType,
        sex: data.sex,
        birthday: data.birthdate,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
) => {
  if (!data.id) {
    console.error("No student ID provided.");
    return { success: false, error: true };
  }

  try {
    const clerk = await clerkClient();

    console.log("Updating user in Clerk with ID:", data.id);
    const user = await clerk.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || "",
        img: data.img || null,
        bloodGroup: data.bloodType,
        sex: data.sex,
        birthday: data.birthdate,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/students");
    console.log("Student updated successfully.");
    return { success: true, error: false };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // --delete user from clerk
    const clerk = await clerkClient();
    clerk.users.deleteUser(id);

    await prisma.student.delete({
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

// Exam server actions

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  const { currentUserId, role } = await getRoleAndUserId();
  try {
    if (role === "teacher") {
      // lesson belong to current user
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: currentUserId!,
          id: data.lessonId,
        },
      });

      // check if current teacher lesson doesnot exits
      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    // Revalidate the path to ensure fresh data
    // revalidatePath("/list/exams");
    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema
) => {
  const { currentUserId, role } = await getRoleAndUserId();
  try {
    if (role === "teacher") {
      // lesson belong to current user
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: currentUserId!,
          id: data.lessonId,
        },
      });

      // check if current teacher lesson doesnot exits
      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }

    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
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
export const deleteExam = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  const { currentUserId, role } = await getRoleAndUserId();
  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher"
          ? { lessons: { some: { teacherId: currentUserId! } } }
          : {}), //Ensures that a teacher can only delete exams associated with their lessons
      },
    });

    return { success: true, error: false };
  } catch (error) {
    console.error(error);
    return { success: false, error: true };
  }
};
