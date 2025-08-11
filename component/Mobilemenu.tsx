"use client";

import { AlignLeft } from "lucide-react";
import SideMenu from "./SideMenu";
import { useState } from "react";

const MobileMenu = () => {
  const [isSidebarOpen, setisSidebarOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setisSidebarOpen(!isSidebarOpen)}>
        <AlignLeft className="md:hidden  hover:text-darkColor hover:cursor-pointer" />
      </button>
      <div className="md:hidden">
      <SideMenu 
      isOpen={isSidebarOpen} 
      onClose= {()=> setisSidebarOpen(false) }
      />
      </div>
    </>
  );
};

export default MobileMenu;
