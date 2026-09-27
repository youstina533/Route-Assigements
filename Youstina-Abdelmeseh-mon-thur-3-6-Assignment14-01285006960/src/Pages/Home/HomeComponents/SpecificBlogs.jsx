import { FaCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import {Link} from 'react-router-dom';
import { IoStar } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
export default function SpecificBlogs(props) {
  let {blogs} = props
  return (
    <>
    <section className="special-blogs bg-[#0A0A0A] py-17 px-40">
      <span className="border border-[#552B0E] py-2 pb-3 px-4 bg-[#422b1983] rounded-3xl">
        <FaCircle className="inline-block text-[#F77216] me-2 text-[8px]" />
        <FaCircle className="inline-block text-[#F77216] text-[10px]" />
        <span className="text-[#F96F12] ms-3 font-semibold ">مميز</span>
      </span>
      <h2 className="text-7xl text-white font-bold mt-9">مقالات مختارة</h2>
      <div className="note-to-start flex justify-between">
       <p className="text-[#9EA1A1] mt-6 text-xl ">محتوى منتقى لبدء رحلة تعلمك</p>
        <Link to="/blog" className=" sm:my-5 flex items-center group/btn transition-all ease-in-out hover:-translate-y-1 duration-200 px-5 py-2.5 rounded-2xl bg-linear-to-r from-[#F76F15] to-[#EC5C0D] text-white font-semibold text-md">
          عرض الكل
          <IoIosArrowBack className="inline-block ms-3 translate-all duration-200 ease-in-out group-hover/btn:-translate-x-1" />
        </Link>
      </div>
      <div className="special-blogs-cards my-14 ">
        {blogs
          .filter((blog) => blog.featured === true)   
          .slice(0, 3)                                
          .map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.slug}`} className="group/card hover:border-[#5e3b29] flex flex-col lg:flex-row lg:min-h-112 overflow-hidden rounded-4xl border border-[#262626] bg-[#141414] hover:cursor-pointer mb-9">
            <div className="card-image relative h-64 overflow-hidden w-full lg:h-auto lg:w-1/2">
              <img src={blog.image} alt="blog-image" className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover/card:scale-110" />
              <span className="absolute top-4 right-4 z-10 flex items-center gap-1 rounded-2xl px-4 pb-1.5 text-white font-semibold text-lg bg-linear-to-r from-[#FF7300] to-[#F3A900]">
                <IoStar className="inline-block mt-1 text-[14px]"/>
                مميز
              </span>
            </div>
            <div className="flex flex-col justify-between p-6 lg:w-1/2 lg:p-10">
              <div className="blog-description">
                <div className="blog-type-div flex gap-4 items-center">
                  <span className="blog-type text-[14px] text-[#F96F12] ms-3 font-medium border border-[#552B0E]  py-1 px-3.5 bg-[#422b1983] rounded-2xl">
                  {blog.category}
                  </span>
                  <span className="blog-reading-time text-[#727272] text-[13px]">
                  <FaRegClock className="inline-block me-2" />
                  {blog.readTime}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-4xl text-white font-semibold mt-4 group-hover/card:text-[#F96F12]">{blog.title}</h3>
                <p className="text-[18px] text-[#A1A1A1] mt-4">{blog.excerpt}</p>
              </div>
              <div className="flex justify-between card-end">
                <div className="writer-div flex gap-2 items-start">
                  <div className="writer-image relative">
                    <span className="inline-block w-14.5 h-14.5 iamge-frame border-2 border-[#262626] rounded-full">
                      <img src={blog.author.avatar} className="w-full h-full rounded-full" alt="writer-image"></img>
                    </span>
                    <span className="cirlce-icon absolute bottom-1 left-0">
                      <FaCircle className="inline-block w-4 text-[#F96F12] border-2 border-black rounded-full" />
                    </span>
                  </div>
                  <div className="writer-name-div">
                    <span className="block writer-name text-md font-semibold text-white mt-1">{blog.author.name}</span>
                    <span className="block blog-date text-[12px] text-[#727272]">{blog.date}</span>
                  </div>
                </div>
              <Link to={`/blog/${blog.slug}`} className=" inline-block text-[#F96F12] font-medium text-xl ">
                  <span className="group-hover/card:me-2 transition-all">اقرأ المقال </span>
                <FaLongArrowAltLeft className="inline-block ms-3"/>
              </Link>
              </div>
            </div>
          </Link>
          ))}  
      </div>
    </section>
    </>
  )
}

