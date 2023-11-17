import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import style from './DefaultLayout.module.css'
const DefaultLayout = () => {
  return (
    <div className={style.default}>
      <div className={style.nav}>
      <Navbar />
      </div>
      <div className={style.main}>
        <Outlet/>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2 ">
        <p className='text-white m-0'>All rights reserved for "Omar Ahmed" <span>{(new Date()).getFullYear()}</span> </p>
      </div>
    </div>
  )
}

export default DefaultLayout
