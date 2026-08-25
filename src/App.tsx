import { ToastContainer } from 'react-toastify'
import AppContainer from './components/container/AppContainer'
import Content from './layout/Content/Content'
import Header from './layout/Header/Header'
import Sidebar from './layout/Sidebar/Sidebar'
import { useAppSelector } from './redux/reduxHooks'
function App() {

  const sideBarShow = useAppSelector(state => state.uiManagerReducer.sideBarShow)

  return (
    <AppContainer>
      <div className='dark:text-gray-100'>
        <Content className='fixed h-screen w-full pt-16 bg-gray-300 md:pr-app-sidebar-w  dark:bg-gray-600' />
        <Header className='fixed flex flex-row top-0 h-app-header-h w-full dark:bg-gray-800 md:pr-app-sidebar-w shadow-lg bg-white' />
        <Sidebar className={`fixed  top-0 dark:bg-gray-700 w-app-sidebar-w bg-white h-screen transition-all duration-300 ease-in-out border-l border-gray-300 ${sideBarShow ? "right-0" : "-right-app-sidebar-w"} lg:right-0`} />
      </div>
      <ToastContainer stacked/>
    </AppContainer>


  )
}

export default App
