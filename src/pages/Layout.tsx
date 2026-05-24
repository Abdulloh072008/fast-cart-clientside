import { Outlet } from "react-router-dom"
import Header from "../components/model/header/Header"
import  Footer from "../components/model/footer/Footer"

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
