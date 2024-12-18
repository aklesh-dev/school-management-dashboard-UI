"use client";

import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Sun',
    present: 90,
    absent: 38,
    
  },
  {
    name: 'Mon',
    present: 40,
    absent: 24,
    
  },
  {
    name: 'Tue',
    present: 30,
    absent: 13,
    
  },
  {
    name: 'Wed',
    present: 20,
    absent: 9,
    
  },
  {
    name: 'Thu',
    present: 80,
    absent: 39,
    
  },
  {
    name: 'Fri',
    present: 90,
    absent: 48,
    
  },  
  
];

const AttendanceChart = () => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-lg h-full'>
      <div className="flex justify-between items-center">
        <h1 className='text-xl font-semibold'>Attendance</h1>
        <Image src={"/moreDark.png"} alt='more' width={20} height={20} />
      </div>

      {/* --Chart-- */}
      <ResponsiveContainer width="100%" height="95%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
          <XAxis dataKey="name" axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false}/>
          <YAxis axisLine={false} tick={{fill: "#d1d5db"}} tickLine={false}/>
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray"}}/>
          <Legend align='left' verticalAlign='top' wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px"}} />
          <Bar dataKey="present" fill="#FAE27C"  legendType='circle'radius={[15,15,0,0]} />
          <Bar dataKey="absent" fill="#C3EBFA"  legendType='circle' radius={[15,15,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart;