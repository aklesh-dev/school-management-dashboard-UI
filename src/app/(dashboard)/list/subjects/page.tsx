import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getRoleAndUserId } from "@/lib/utils";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type SubjectList = Subject & { teachers: Teacher[]};

const createColumns = (role: string | undefined) => {
const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];
return columns;
};

const createRenderRow =(role: string | undefined) => {
const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-izumiPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">        
      {item.name}
    </td>
    <td className="hidden md:table-cell">
      {item.teachers.map(teacher=>teacher.name).join(", ")}
    </td>
    <td>
      <div className="flex items-center gap-2">          
        {role === "admin" && (
          <>
          <FormContainer table="subject" type="update" data={item}/>
          <FormContainer table="subject" type="delete" id={item.id}/>
          </>
        )}
      </div>
    </td>
  </tr>
);
return renderRow;
};

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // --USER ROLE
  const { role} = await getRoleAndUserId();

  const columns = createColumns(role);
  const renderRow = createRenderRow(role);
  
  // --URL PARAMS CONDITION

  // --Dynamic filtering condition for querying student data
  const query: Prisma.SubjectWhereInput = {}; //--Prisma query
  if (queryParams) {
    // Check if queryParams exists and is not null/undefined
    for (const [key, value] of Object.entries(queryParams)) {
      // Iterate over each key-value pair in the queryParams object
      if (value !== undefined) {
        // Ensure the value is defined before processing
        switch (key) {          
          case "search": {
            query.name = { contains: value, mode: "insensitive" };
          }
          break;
          default: 
            break;
        }
      }
    }
  };

  const [data, count] = await prisma.$transaction([
    prisma.subject.findMany({ 
      where: query,
      include: {
        teachers: true,
      },    
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.subject.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-izumiYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-izumiYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {/* --create form model-- */}
            {role === "admin" && (
              <FormContainer table="subject" type="create"/>
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

export default SubjectListPage;
