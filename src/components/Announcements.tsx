"use client";

const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md shadow-md'>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <span className="text-gray-400 text-sm">View all</span>
      </div>

      <div className="flex flex-col mt-4 gap-4">
        <div className="bg-izumiSkyLight p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor.</h2>
            <span className="text-gray-400 text-xs bg-white rounded-md p-1">2024-01-01</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque officiis quis debitis libero laboriosam 
          </p>
        </div>
        <div className="bg-izumiPurpleLight p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor.</h2>
            <span className="text-gray-400 text-xs bg-white rounded-md p-1">2024-01-01</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque officiis quis debitis libero laboriosam 
          </p>
        </div>
        <div className="bg-izumiYellowLight p-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor.</h2>
            <span className="text-gray-400 text-xs bg-white rounded-md p-1">2024-01-01</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque officiis quis debitis libero laboriosam 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Announcements;