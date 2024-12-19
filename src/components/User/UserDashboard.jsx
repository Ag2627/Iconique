import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import DataProvider from '../../context/DataProvider'
import Footer from '../Footer/Footer'


const UserDashboard = () => {
  return (
   <>
    <DataProvider>
        <Header/>
    </DataProvider>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default UserDashboard