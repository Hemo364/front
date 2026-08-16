import { useState } from 'react'
import Content from './layout/Content/Content'
import Header from './layout/Header/Header'
import Sidebar from './layout/Sidebar/Sidebar'
function App() {

  const [sideBarShow,SetSideBarShow]=useState(false)
  return (
    <>
    <Content className='fixed h-screen w-full pt-16 md:pr-app-sidebar-w bg-green-400'/>
    <Header SideBarShow={sideBarShow} SetSideBarShow={SetSideBarShow} className='fixed top-0 h-app-header-h w-full bg-blue-300 md:pr-app-sidebar-w'/>
    <Sidebar SideBarShow={sideBarShow} SetSideBarShow={SetSideBarShow} className={`fixed top-0 bg-pink-300 w-app-sidebar-w h-screen transition-all duration-300 ease-in-out ${sideBarShow ? "right-0" : "-right-app-sidebar-w"} lg:right-0`}/>
    
    </>
  )
}

export default App
