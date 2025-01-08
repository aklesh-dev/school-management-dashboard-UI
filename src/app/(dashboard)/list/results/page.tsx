import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, examsData, resultsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-izumiPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td className="">{item.studentName + " " + item.studentSurname}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">
      {" "}
      {item.teacherName + " " + item.teacherSurname}{" "}
    </td>
    <td className="hidden md:table-cell"> {item.className} </td>
    <td className="hidden md:table-cell">
      {" "}
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}{" "}
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-izumiSky">
            <Image src={"/update.png"} alt="edit" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" ||
          (role === "teacher" && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          ))}
      </div>
    </td>
  </tr>
);

const ResultListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // --URL PARAMS CONDITION

  // --Dynamic filtering condition for querying data
  const query: Prisma.ResultWhereInput = {}; //--Prisma query
  if (queryParams) {
    // Check if queryParams exists and is not null/undefined
    for (const [key, value] of Object.entries(queryParams)) {
      // Iterate over each key-value pair in the queryParams object
      if (value !== undefined) {
        // Ensure the value is defined before processing
        switch (key) {
          case "studentId":
            query.studentId =  value;
            break;
          
          case "search":
            query.OR = [
              {exam: {title: {contains: value, mode: "insensitive"}}},
              {student: {name: {contains: value, mode: "insensitive"}}},
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  // -- Map over the fetched data array to transform each item
  const data = dataRes.map((item) => {
    // -- Determine if the assessment is an exam or an assignment.
    const assessment = item.exam || item.assignment;

    // --If there's no assessment, return null for this item (skip it)--
    if (!assessment) return null;
    // --Check if the assessment has a "startTime" property to idenfify if it's an exam
    const isExam = "startTime" in assessment;

    // --Return a new object with the desired properties.--
    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-izumiYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-izumiYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-izumiYellow">
                <Image src="/plus.png" alt="" width={14} height={14} />
              </button>
              // <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ResultListPage;
