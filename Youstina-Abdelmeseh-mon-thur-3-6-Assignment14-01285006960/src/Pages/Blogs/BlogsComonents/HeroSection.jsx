import { FaCircle } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";

export default function HeroSection() {
  return (
    <div>
        <section className="py-20 relative bg-[#0b0b0b] bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[75px_75px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,#fe5e0020,transparent_60%)]" />
        <div className="relative text-center w-[40%] m-auto">
          <span className="border border-[#552B0E] py-2.5 px-6 bg-[#422b1983] rounded-3xl">
           <FaCircle className="inline-block text-[#F77216] me-2 text-[8px]" />
           <IoNewspaperSharp  className="inline-block text-[#F77216]  text-[16px]" />
           <span className="text-[#F77216] ms-3 font-medium ">مدونتنا</span>
          </span>
          <h1 className="text-7xl mt-11 text-white font-bold leading-snug"> استكشف <span className="text-[#F98F1B]">مقالاتنا</span></h1>
          <p className="text-[#A1A1A1] text-[21px] mt-6 font-normal">اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث</p>
        </div>
      </section>
    </div>
  )
}
