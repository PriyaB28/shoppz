import { Outlet} from "react-router"
import "./style.css"

import Header from "../../../components/portal/Header"
import Sidebar from "../../../components/portal/Sidebar"
// import Sidebar from "./Sidebar"
import Footer from '../../../components/portal/Footer'

const Layout = () => {
  return (
    <div className="body page">
      <Header />
      {/* <Sidebar /> */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout