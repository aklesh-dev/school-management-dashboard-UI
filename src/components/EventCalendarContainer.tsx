import Image from "next/image";
import EventList from "./EventList";
import EventCalendar from "./EventCalendar";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { date } = searchParams;
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* -- Event Calendar component-- */}
      <EventCalendar />
      {/* -- Event Section -- */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4"> Events</h1>
        <Image src={"/moreDark.png"} alt="more" width={20} height={20} />
      </div>
      {/*-- Display events -- */}
      <div className="flex flex-col gap-4">
        <EventList dateParams={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
