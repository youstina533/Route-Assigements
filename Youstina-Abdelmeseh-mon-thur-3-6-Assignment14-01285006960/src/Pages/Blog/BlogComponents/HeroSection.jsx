import { Link } from "react-router-dom";
import { FaHouseChimneyWindow } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";

export default function HeroSection({blog}) {

  return (
    <>
    <section className=" w-full">
      <div className="hero-details relative w-full h-[75vh] overflow-hidden">
        <div
          style={{ backgroundImage: `url(${blog.image})` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
        <div className="relative z-10 p-10">

          <div className="routing-links rounded-3xl bg-[#333435a6] px-6 py-2 mb-10 inline-block border border-[#434140]">
            <Link to="/">
              <FaHouseChimneyWindow className="text-white text-lg me-2 inline-block" />
            </Link>
            <IoIosArrowBack className="inline-block text-[#7A7A7C] text-xl" />
            <Link to="/blog">
              <span className="text-base text-[#C4C3C4] hover:text-white">المدونة</span>
            </Link>
            <IoIosArrowBack className="inline-block text-[#7A7A7C] text-xl" />
            <span >
              <span className="text-base text-[#FF6900]">{blog.category}</span>
            </span>
          </div>
          <div className="w-[70%] m-auto">
            <div className="blog-info-title flex gap-4 items-center">
              <span className="blog-type px-4 py-2 rounded-3xl bg-[#FF6900] text-base text-white font-medium">
                إضاءة
              </span>
              <span className="blog-date font-bold text-[#C5C7B7]">
                <MdOutlineDateRange className="inline-block me-2" />
                {blog.date}
              </span>
              <span className="blog-time font-bold text-[#C5C7B7]">
                <FaRegClock className="inline-block me-2" />
                {blog.readTime}  
              </span>
            </div>
            <div className="blog-writer-title mt-10">
              <h1 className="text-6xl text-white font-bold"> {blog.title}</h1>
              <div className="writer-div bg-[#1f2123bc] px-3 py-3 w-[18%] border-2 border-[#2c3032] mt-10 rounded-2xl flex gap-3">
                <img src={blog.author.avatar} alt="writerImage" className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover" />
                <div>
                  <span className="writer-name inline-block text-white text-lg">{blog.author.name}</span>
                  <span className="writer-role text-[#A8A8A9] text-base block"> {blog.author.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
