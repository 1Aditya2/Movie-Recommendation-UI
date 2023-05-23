import React from 'react'
import Searchbar from '../../Components/SeacrhBar/Searchbar'
import { Outlet } from 'react-router-dom'

function Home() {
  
  return (
    <div>
      <Searchbar/>
      <Outlet/>
    </div>
  )
}

export default Home