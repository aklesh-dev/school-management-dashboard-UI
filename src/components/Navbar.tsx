import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4'>
      {/* --Search Bar-- */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src={"/search.png"} alt="search" width={14} height={14} />
        <input type="text" placeholder="search..." className="bg-transparent outline-none p-2 w-[200px]"/>
      </div>

      {/* --Icon and User */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src={'/message.png'} alt="message" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src={'/announcement.png'} alt="message" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 bg-purple-500 text-white flex items-center justify-center rounded-full text-xs">1</div>
        </div>
        {/* --user-- */}
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">Izumi Dirama</span>
          <span className="text-[10px] text-right text-gray-500">Admin</span>
        </div>
        {/* --avatar */}
        {/* <Image src={"/avatar.png"} alt="avatar" height={36} width={36} className="rounded-full" /> */}
        <UserButton />
      </div>
    </div>
  )
}

export default Navbar;