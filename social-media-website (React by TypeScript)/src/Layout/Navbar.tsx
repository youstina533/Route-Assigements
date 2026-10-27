import { Link, useNavigate } from "react-router-dom";
import {useState, useContext} from "react";
import { FaBars } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { AuthContext } from './../Context/AuthContextValue';


export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const {userToken, setuserToken} = useContext(AuthContext); 
  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem("userToken");
    setuserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-neutral-primary fixed w-full top-0 inset-s-0 shadow-md z-20 bg-white">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            
            <span className="self-center text-heading font-semibold whitespace-nowrap text-2xl text-blue-700">AllTimeNews</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {userToken ? 
            <>
             <Link to="/" className="block py-2 px-3 text-blue-900 text-lg bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</Link>
             <Link to="/profile" className="block py-2 px-3 text-blue-900 text-lg  text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Profile</Link>
             <button onClick={()=> logout()} className="inline-block bg-blue-900 rounded-xl pt-1 pb-2 px-2 hover:bg-blue-950 text-white text-lg text-heading cursor-pointer">Logout</button>
            </> :
            <>
            <Link to="/register" className="block py-2 px-3 text-blue-900 text-lg  text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Register</Link>
            <Link to="/login" className="block py-2 px-3 text-blue-900 text-lg  text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Login</Link>
            </>
            }  
          </div>
          <button onClick={() => setisOpen(!isOpen)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body outline-none border-none rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary">
            {!isOpen ? <FaBars className="size-7 text-blue-800" /> : <IoMdCloseCircle className="size-10 text-blue-800" />}
          </button>
        </div>
        <div className={`md:hidden border-none ${isOpen ? "block" : "hidden"}`} >
          <div className="px-2 pt-3 pb-3 space-y-1 bg-white ">
            <div className="flex-col gap-4 flex">    
              {userToken ? 
                <>
                <Link to="/" className="block py-2 px-3 text-blue-900 text-lg bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</Link>
                <Link to="/profile" className="block py-2 px-3 text-blue-900 text-lg  text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Profile</Link>
                <button onClick={()=> logout()} className="inline-block bg-blue-900 rounded-xl py-1 px-2 hover:bg-blue-950 text-white text-lg text-heading cursor-pointer">Logout</button>
                </> :
                <>
                <Link to="/register" className="block py-2 px-3 text-blue-900 text-lg  text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Register</Link>
                <Link to="/login" className="block py-2 px-3 text-blue-900 text-lg  text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Login</Link>
                </>
              }  
            </div>
          </div>
        </div>
      </nav>

    </>
  )
}
