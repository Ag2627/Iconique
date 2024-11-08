import FactCheckIcon from '@mui/icons-material/FactCheck';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import InventoryIcon from '@mui/icons-material/Inventory';

export const sellerSidebarMenuitems=[
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

]