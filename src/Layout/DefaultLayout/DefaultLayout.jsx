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
    </div>
  )
}

export default DefaultLayout