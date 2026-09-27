import { FaCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
export default function LatestBlogs({blogs}) {
  const latestBlogs = [...blogs]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
  return (
     <>
      <section className="latest-blogs bg-[#0A0A0A] py-17 px-40 border-t-2 border-t-[#272727]">
        <div className="latest-blog-div">
          <div className="latestBlogs-title">
            <span className="border border-[#552B0E] py-2 pb-3 px-4 bg-[#422b1983] rounded-3xl">
              <FaCircle className="inline-block text-[#F77216] me-2 text-[8px]" />
              <FaCircle className="inline-block text-[#F77216] text-[10px]" />
            <span className="text-[#F96F12] ms-3 font-semibold ">الأحدث</span>
            </span>
            <h2 className="text-7xl text-white font-bold mt-9">أحدث المقالات</h2>
            <div className="note-to-start flex justify-between">
              <p className="text-[#9EA1A1] mt-6 text-xl ">محتوى جديد طازج من المطبعة</p>
              <Link to="/blog" className=" sm:my-5 flex items-center group/btn px-5 py-2.5 rounded-2xl text-[#F77216] hover:text-[#ed8942] font-semibold text-lg">
                عرض جميع المقالات
                <IoIosArrowBack className="inline-block ms-3 translate-all duration-200 ease-in-out group-hover/btn:-translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="latestBlogs-cards mt-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
            {latestBlogs.map((blog) => {
              return(
                <Link to={`/blog/${blog.slug}`} className="group/card hover:border-[#5e3b29] flex flex-col overflow-hidden rounded-4xl border border-[#262626] bg-[#141414] hover:cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1">
              <div className="card-image relative h-64 overflow-hidden w-full">
                <img src={blog.image} alt="" className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover/card:scale-110" />
                <span className="absolute top-4 right-4 z-10 rounded-2xl bg-black/80 px-4 py-1 text-sm font-semibold text-white">
                  {blog.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="blog-description">
                  <div className="blog-reading-time flex items-center gap-2 text-[#727272] text-[14px]">
                    <FaRegClock />
                    <span>{blog.readTime}</span>
                    <span>•</span>
                    <span>{blog.date}  </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white group-hover/card:text-[#F96F12] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="mt-3 text-base text-[#A1A1A1]">
                     {blog.excerpt}
                  </p>
                </div>
                <div className="card-end mt-6 flex items-center justify-between border-t border-[#262626] pt-5">
                  <div className="writer-div flex items-center gap-3">
                    <span className="inline-block w-12 h-12 shrink-0 border-2 border-[#262626] rounded-full overflow-hidden">
                      <img src={blog.author.avatar} className="w-full h-full object-cover object-top" alt="writer-image" />
                    </span>
                    <div className="writer-name-div">
                      <span className="block text-base font-semibold text-white">{blog.author.name} </span>
                      <span className="block text-[13px] text-[#727272]">{blog.author.role}</span>
                    </div>
                  </div>
                  <Link to={`/blog/${blog.slug}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5e3b29] bg-[#2a1a10] text-[#F96F12] transition-all group-hover/card:bg-[#F96F12] group-hover/card:text-white">
                    <FaChevronLeft />
                  </Link>
                </div>
              </div>
            </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
