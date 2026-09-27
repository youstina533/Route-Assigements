import { FaImages } from "react-icons/fa";
import {Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function BlogsMayBeLoved({blogs}) {
  return (
    <>
      <section className="blogs-may-love-section px-40 bg-[#0A0A0A]">
        <div className="title-div flex justify-between bg-[#0A0A0A] border-t border-t-[#262626] pt-10">
          <div className="title flex gap-5 mb-10 items-center">
            <span className="image-icon border border-[#4B2407] bg-[#231309d5] px-3.5 py-3 rounded-2xl">
              <FaImages className="inline-block text-[#FF6900] text-2xl" />
            </span>
            <div className="title-details">
              <h2 className="text-white text-3xl font-semibold">مقالات قد تعجبك</h2>
              <p className="text-lg text-[#737373]">استكشف المزيد من المحتوى المميز</p>
            </div>
          </div>
          <Link to="/blog" className=" sm:my-5 flex items-center group/btn text-[#FF6900] font-semibold text-lg hover:text-[#FF8904]">
            عرض الكل
            <FaArrowLeft className="inline-block ms-3 translate-all duration-200 ease-in-out group-hover/btn:-translate-x-1" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-15">
          {blogs.slice(0,3).map((blog) =>{
            return(
              <Link to={`/blog/${blog.slug}`} className="group/card relative h-90 overflow-hidden rounded-4xl border border-[#262626] hover:cursor-pointer hover:border hover:border-[#974001]">
                <img src={blog.image} alt="blog-image" className="absolute inset-0 h-full w-full object-cover transition-all duration-200 ease-in-out group-hover/card:scale-110"/>
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                  <span className="absolute top-4 right-4 z-10 rounded-2xl bg-linear-to-r from-[#FF7300] to-[#F3A900] px-4 py-1 text-sm font-semibold text-white">
                    {blog.category}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-5 pb-9 bg-[#111111]">
                    <h3 className="text-xl font-bold text-white group-hover/card:text-[#F96F12] transition-colors">
                      {blog.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={blog.author.avatar} className="h-8 w-8 rounded-full border-2 border-[#262626] object-cover object-top" alt="writer-image" />
                        <span className="text-[13px] font-medium text-white">{blog.author.name}</span>
                      </div>
                      <span className="text-[13px] text-[#C4C3C4]">{blog.readTime}  </span>
                    </div>
                  </div>
              </Link>
            )
          })}  
        </div>
      </section>
    </>
  )
}
