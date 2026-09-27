import { FaCircle } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import {Link} from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
export default function BlogsCategories({categories}) {
  return (
    <>
      <section className="blogs-category bg-[#111111] py-17 px-40 border-t-2 border-t-[#252525]">
        <div className="category-div-title text-center">
          <span className="border border-[#552B0E] py-2 px-4 bg-[#422b1983] rounded-3xl">
            <FaCircle className="inline-block text-[#F77216] me-2 text-[8px]" />
            <FaCircle className="inline-block text-[#F77216] text-[10px]" />
            <span className="text-[#F77216] ms-3 font-semibold text-[16px] ">التصنيفات</span>
          </span>
          <h2 className="text-6xl text-white font-bold my-7">استكشف حسب الموضوع</h2>
          <p className="text-[#A1A1A1] text-xl">اعثر على محتوى مصمم حسب اهتماماتك</p>
        </div>
        <div className="category-cards pb-8 website info div grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 mt-16">
          {categories.map((category) =>{
            return(
              <Link to={`/blog?category=${category.name}`} className=" category-card flex justify-between m-0 group/category py-6 ps-5 rounded-3xl border border-[#262626] bg-[#141414] transition-all ease-in-out duration-200 hover:-translate-y-1 hover:bg-linear-to-r from-[#FF7E00] to-[#F2AD00]">
                <div className="category-details flex flex-col">
                  <span className="text-[#FF6900] group-hover/category:text-white group-hover/category:bg-[#f8b455] group-hover/category:border-0 text-3xl pt-2 pb-2.5 px-3.5 rounded-2xl border border-[#592D10] bg-[#2e1e14d3] w-fit">
                  <FaSun className="inline-block" />
                  </span>
                  <span className="text-white text-xl font-bold my-2.5">
                    {category.name}
                  </span>
                  <span className="text-[#737173] text-md group-hover/category:text-gray-200 "> {category.count} مقالة </span>
                </div>
                <Link to="/blog" className="rounded-full opacity-0 p-3 bg-[#f9aa56d1] transition-opacity duration-500 text-white group-hover/category:opacity-100 h-fit me-10">
                  <IoIosArrowBack className="inline-block"/>
                </Link>
              </Link>
          )
          })}
        </div>
      </section>
    </>
  )
}
