"use client";

import Image from "next/image";
import { title } from "process";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Temporary
const Events = [
  {
    id: 1,
    title: "Event 1",
    time: "12pm to 2pm",
    description: "This is the first event",
  },
  {
    id: 2,
    title: "Event 2",
    time: "2pm to 4pm",
    description: "This is the second event",
  },
  {
    id: 3,
    title: "Event 3",
    time: "4pm to 6pm",
    description: "This is the third event",
  },
  {
    id: 4,
    title: "Event 4",
    time: "6pm to 8pm",
    description: "This is the fourth event",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Calendar onChange={onChange} value={value} />

      {/* -- Event Section -- */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4"> Events</h1>
        <Image src={"/moreDark.png"} alt="more" width={20} height={20} />
      </div>

      {/*-- Display events -- */}
      <div className="flex flex-col gap-4">
        {Events.map((event) => (
          <div key={event.id} className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-izumiSky even:border-t-izumiPurple">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-400 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
