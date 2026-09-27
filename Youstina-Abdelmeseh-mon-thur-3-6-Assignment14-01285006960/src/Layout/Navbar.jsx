import { NavLink, Link} from 'react-router-dom'
import navIcon from '../assets/images/navIcon.png'
import navStyle from '../assets/styles/navStyles.module.css'
import { MdOutlineSearch } from "react-icons/md";

export default function Navbar() {
  return (
    <>
      <nav className ="bg-[#161616] sticky top-0 z-50 w-full">
        <div className=" w-full py-3.5 flex justify-around">
          <Link to="/" className="nav-title-div flex gap-3">
            <span className="nav-icon">
              <img className="h-13.5 w-13.5" src={navIcon} alt="nav-icon"></img>
            </span>
            <div className="nav-title">
              <h2 className="text-[#E3E3E3] text-2xl">عدسة</h2>
              <span className="text-[#AA5E0A] text-sm">عالم التصوير الفوتوغرافي</span>
            </div>
          </Link>
          <div className="navLinks-div flex items-center py-2 px-2.5 bg-[#161616] rounded-4xl border-2 border-[#262626] m-0 p-0">
            <NavLink to="/" className="px-4.5 py-2.5 text-[#919191] text-base font-medium">الرئيسية</NavLink>
            <NavLink to="blog" className="px-4.5 py-2.5 text-[#919191] text-base font-medium">المدونة</NavLink>
            <NavLink to="who" className="px-4.5 py-2.5 text-[#919191] text-base font-medium">من نحن</NavLink>
          </div>
          <div className="start-section-div flex gap-3">
            <div className={`search-icon px-3 py-0 border-2 border-transparent text-[#737373] text-3xl ${navStyle.searchIconHover} flex items-center`}>
              <MdOutlineSearch />
            </div>
            <button className="read-btn inline bg-[#EE600F] rounded-4xl px-10 py-2 cursor-pointer text-[white] font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 ">ابدأ القراءة</button>
          </div>
        </div>
      </nav>
    </>
  )
}
