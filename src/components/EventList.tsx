import prisma from "@/lib/prisma";

const EventList = async ({
  dateParams,
}: {
  dateParams: string | undefined;
}) => {
  const date = dateParams ? new Date(dateParams) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });


  return data.map((event) => (
    <div
      key={event.id}
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-izumiSky even:border-t-izumiPurple"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-400 text-xs">{event.startTime.toLocaleTimeString("en-NP", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}</span>
      </div>
      <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
