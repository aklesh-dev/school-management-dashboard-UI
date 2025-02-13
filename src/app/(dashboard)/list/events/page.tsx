import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { getRoleAndUserId } from "@/lib/utils";
import { Class, Event, Prisma } from "@prisma/client";
import Image from "next/image";

type EventList = Event & { class: Class };

const createColumns = (role: string | undefined) => {
  return () => {
    const columns = [
      {
        header: "Title",
        accessor: "title",
      },
      {
        header: "Class",
        accessor: "class",
      },
      {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
      },
      {
        header: "Start Time",
        accessor: "startTime",
        className: "hidden md:table-cell",
      },
      {
        header: "End Time",
        accessor: "endTime",
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
};

const createRenderRow = (role: string | undefined) => {
  const RenderRow = (item: EventList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-izumiPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td className="">{item.class?.name || "-"}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {" "}
        {item.startTime.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}{" "}
      </td>
      <td className="hidden md:table-cell">
        {" "}
        {item.endTime.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}{" "}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* --Update Btn-- */}
              <FormModal table="event" type="update" data={item} />
              {/* --Delete Btn-- */}
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return RenderRow;
};

const EventListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // --USER ROLE
  const { role, currentUserId } = await getRoleAndUserId();
  // --function with user role
  const renderRow = createRenderRow(role);
  // --Higher order function to create columns
  const getColumns = createColumns(role);
  const columns = getColumns();

  // --URL PARAMS CONDITION

  // --Dynamic filtering condition for querying data
  const query: Prisma.EventWhereInput = {}; //--Prisma query
  if (queryParams) {
    // Check if queryParams exists and is not null/undefined
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  // --ROLE CONDITIONS

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };

  query.OR = [
    { classId: null },
    { class: roleConditions[role as keyof typeof roleConditions] || {} },
  ];

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.event.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-izumiYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-izumiYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="event" type="create" />}
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

export default EventListPage;
