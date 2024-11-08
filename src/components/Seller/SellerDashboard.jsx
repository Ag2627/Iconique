import { useState } from "react"
import SellerSidebar from "./SellerSidebar";
import SellerHeader from "./SellerHeader";
import { Outlet } from "react-router-dom";


const SellerDashboard = () => {
    const [openSidebar,setOpenSidebar]=useState(false);
    
  return (
    <div className="flex min-h-screen w-full">
    {/* admin sidebar */}
    <SellerSidebar open={openSidebar} setOpen={setOpenSidebar} />
    <div className="flex flex-1 flex-col">
      {/* admin header */}
      <SellerHeader setOpen={setOpenSidebar} />
      <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  </div>
  )
}

export default SellerDashboard