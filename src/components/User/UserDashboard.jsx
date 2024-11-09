import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import DataProvider from '../../context/DataProvider'

const UserDashboard = () => {
  return (
   <>
    <DataProvider>
        <Header/>
    </DataProvider>
   <Outlet/>
   </>
  )
}

export default UserDashboard