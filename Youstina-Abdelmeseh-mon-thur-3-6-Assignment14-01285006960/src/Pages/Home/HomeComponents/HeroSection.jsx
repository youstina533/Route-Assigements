import { FaCircle } from "react-icons/fa";
import {Link} from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";


export default function HeroSection() {
  return (
    <>
      <section className="pt-30 relative bg-[#0b0b0b] bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[75px_75px] min-h-screen">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,#fe5e0020,transparent_60%)]" />
        <div className="relative text-center w-[40%] m-auto">
          <span className="border border-[#552B0E] py-2 px-4 bg-[#422b1983] rounded-3xl">
           <FaCircle className="inline-block text-[#F77216] me-2 text-[8px]" />
           <FaCircle className="inline-block text-[#F77216] text-[10px]" />
           <span className="text-white ms-3 font-semibold ">مرحباً بك في عدسة</span>
          </span>
          <h1 className="text-7xl mt-11 text-white font-bold leading-snug"> اكتشف <span className="text-[#FBA720]">فن</span> <br></br> التصوير الفوتوغرافي</h1>
          <p className="text-[#A1A1A1] text-[25px] mt-6 font-normal">انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.</p>
          <div className="action-buttons mt-16">
            <Link to="/blog" className="group/btn inline-block transition-all ease-in-out hover:-translate-y-1 duration-200 px-7 py-5 rounded-4xl bg-linear-to-r from-[#F76F15] to-[#EC5C0D] text-white font-medium text-xl ">
            استكشف المقالات
            <FaLongArrowAltLeft className="inline-block ms-3 translate-all duration-200 ease-in-out group-hover/btn:-translate-x-1" />
            </Link>
            <Link to="who" className=" ms-5 inline-block px-7 py-5 rounded-4xl text-white font-medium text-xl border border-[#333333] hover:bg-[#2D190A] hover:border-[#EC5C0D] hover:text-[#EC5C0D]">
            <CiCircleInfo className="inline-block me-3 text-xl font-semibold" />
            اعرف المزيد
            </Link>
          </div>
          <div className=" pb-8 website info div grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 mt-16">
            <div className=" m-0 flex flex-col numbers-div py-3 rounded-4xl border border-[#262626] bg-[#141414] transition-all ease-in-out duration-200 hover:scale-110">
              <span className="text-[#FF6900] text-3xl">
                <IoNewspaperSharp className="inline-block" />
              </span>
              <span className="text-[#FA9A1D] text-3xl font-bold my-1">
                +50
              </span>
              <span className="text-[#737173] text-md">مقالة </span>
            </div>
            <div className=" m-0 flex flex-col numbers-div py-3 rounded-4xl border border-[#262626] bg-[#141414] transition-all ease-in-out duration-200 hover:scale-110">
              <span className="text-[#FF6900] text-3xl">
                <FaUsers className="inline-block" />
              </span>
              <span className="text-[#FA9A1D] text-3xl font-bold my-1">
                +10ألف
              </span>
              <span className="text-[#737173] text-md">قارئ</span>
            </div>
            <div className=" m-0 flex flex-col numbers-div py-3 rounded-4xl border border-[#262626] bg-[#141414] transition-all ease-in-out duration-200 hover:scale-110">
              <span className="text-[#FF6900] text-3xl">
                <FaFolderOpen className="inline-block" />
              </span>
              <span className="text-[#FA9A1D] text-3xl font-bold my-1">
                4
              </span>
              <span className="text-[#737173] text-md">تصنيفات</span>
            </div>
            <div className=" m-0 flex flex-col numbers-div py-3 rounded-4xl border border-[#262626] bg-[#141414] transition-all ease-in-out duration-200 hover:scale-110">
              <span className="text-[#FF6900] text-3xl">
                <FaPenNib className="inline-block" />
              </span>
              <span className="text-[#FA9A1D] text-3xl font-bold my-1">
                6
              </span>
              <span className="text-[#737173] text-md">كاتب</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
