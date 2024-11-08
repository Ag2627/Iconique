import React, { Fragment } from 'react'
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { useNavigate } from 'react-router-dom';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { ChartNoAxesCombined } from 'lucide-react';


const sellerSidebarMenuitems=[
    {
        id:'dashboard',
        label:'Dashboard',
        path:'/seller/dashboard',
        icons:<DashboardTwoToneIcon/>
    },
    {
        id:'products',
        label:'Products',
        path:'/seller/products',
        icons:<InventoryIcon/>
    },
    {
        id:'orders',
        label:'Orders',
        path:'/seller/orders',
        icons:<FactCheckIcon/>
    },
    {
      id:'followers',
      label:'Followers',
      path:'/seller/followers',
      icons:<GroupAddIcon/>
  },

]


const MenuItems=({setOpen})=>{
  const navigate=useNavigate();
    return <nav className='mt-8 flex-col flex gap-2' >
      {
        sellerSidebarMenuitems.map(menuitem=><div key={menuitem.id} onClick={()=>{
          navigate(menuitem.path);
          setOpen? setOpen(false):null;
        } 
          }className='flex  cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground'>
          {menuitem.icons}
          <span>{menuitem.label}</span>
        </div>)
      }

    </nav>
}
const SellerSidebar = ({open,setOpen}) => {
  const navigate=useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Seller Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div  onClick={()=>navigate("/seller/dashboard")} className='flex  cursor-pointer items-center gap-2'>
          <AutoGraphIcon size={30}/>
          <h1 className='font-extrabold text-3xl '>Seller Panel</h1>

        </div>
        <MenuItems/>
      </aside>
    </Fragment>
  )
}

export default SellerSidebar