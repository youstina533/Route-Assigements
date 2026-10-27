import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
       <div className="min-h-screen container w-[80%] mx-auto">
         <Outlet/>
       </div>
      <Footer /> 
    </>
  )
}
