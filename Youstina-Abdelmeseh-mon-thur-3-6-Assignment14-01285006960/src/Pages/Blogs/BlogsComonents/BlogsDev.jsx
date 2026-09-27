import { FaSearch } from "react-icons/fa";
import { PiSquaresFourLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6"
import { FaRegClock } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

export default function BlogsDev({blogs}) {
  let [filterBlogsArray, setFilterBlogsArray]=useState(blogs)
  let [searchParams] = useSearchParams();
  let categoryFromUrl = searchParams.get("category");
  let [activeCategory, setActiveCategory] = useState("allBlogs");
  let [cardLayout,setCardLayout] = useState(true);
  let [activeLayout, setActiveLayout] = useState("vertical");

  useEffect(() => {
    if (!blogs.length) return;

    if (categoryFromUrl) {
      const selected = blogs.filter(
        (blog) => blog.category === categoryFromUrl
      );
      setFilterBlogsArray(selected);
      setActiveCategory(categoryFromUrl);
    } else {
      setFilterBlogsArray(blogs); 
    }
  }, [blogs, categoryFromUrl]);


  function filterBlogs(params) {
    setActiveCategory(params);

    if (params === "allBlogs") {
      setFilterBlogsArray(blogs);
      return;
    }
    const selected = blogs.filter(
      (blog) => blog.category === params
    );

    setFilterBlogsArray(selected);
  }
  
  function SearchBlogs(userInput) {
    if (!userInput.trim()) {
      setFilterBlogsArray(blogs);
      return;
    }

    const selected = blogs.filter((blog) =>
      blog.category.includes(userInput) ||
      blog.title.includes(userInput) ||
      blog.excerpt.includes(userInput)
    );

    setFilterBlogsArray(selected);
  }
  function changeLayout(userChoice){
    if(userChoice==="vertical"){
     setCardLayout(true);
     setActiveLayout("vertical");
    }
    else if(userChoice === "horizontal"){
      setCardLayout(false);
      setActiveLayout("horizontal");
    }
  }

  function deleteFilters(){
   setFilterBlogsArray(blogs);
   SearchBlogs("");
    setActiveCategory("allBlogs");
  }

  return (
    <>
     <section className="blogsSection bg-[#0A0A0A] pb-25 pt-2">
      <div className="user-actions-div my-8 flex justify-between items-center px-40">
        <div className="relative search-input">
          <input onChange={(e) => SearchBlogs(e.target.value)} type="text" id="search" className="block py-4 pe-38 ps-10 rounded-2xl bg-[#161616] border border-[#262626] text-white text-[16px] font-normal focus:outline-0 focus:border-[#F64D00] shadow-xs placeholder:text-[#737373]" placeholder=" ابحث في المقالات ..."/>
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <FaSearch className="inline-block text-[#737373] text-lg" />
          </div>
        </div>
        <div className="category-buttons grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 ms-4">
          <button onClick={()=> filterBlogs("allBlogs")} 
            className={`rounded-xl cursor-pointer px-5 py-2.5 border text-md transition-all
              ${activeCategory === "allBlogs"
                ? "bg-[#F64D00] border-[#F64D00] text-white"
                : "border-[#262626] bg-[#161616] text-[#A1A1A1] hover:border-[#F64D00]"
              }`}
          >جميع المقالات</button>
          <button onClick={()=> filterBlogs("إضاءة")} 
            className={`rounded-xl cursor-pointer px-5 py-2.5 border text-md transition-all
              ${activeCategory === "إضاءة"
                ? "bg-[#F64D00] border-[#F64D00] text-white"
                : "border-[#262626] bg-[#161616] text-[#A1A1A1] hover:border-[#F64D00]"
              }`}
            >إضاءة</button>
          <button onClick={()=> filterBlogs("بورتريه")}  
            className={`rounded-xl cursor-pointer px-5 py-2.5 border text-md transition-all
              ${activeCategory === "بورتريه"
                ? "bg-[#F64D00] border-[#F64D00] text-white"
                : "border-[#262626] bg-[#161616] text-[#A1A1A1] hover:border-[#F64D00]"
              }`}
            >بورتريه</button>
          <button onClick={()=> filterBlogs("مناظر طبيعية")}  
            className={`rounded-xl cursor-pointer px-5 py-2.5 border text-md transition-all
              ${activeCategory === "مناظر طبيعية"
                ? "bg-[#F64D00] border-[#F64D00] text-white"
                : "border-[#262626] bg-[#161616] text-[#A1A1A1] hover:border-[#F64D00]"
              }`}
            >مناظر طبيعية</button>
          <button onClick={()=> filterBlogs("تقنيات")}  
            className={`rounded-xl cursor-pointer px-5 py-2.5 border text-md transition-all
            ${activeCategory === "تقنيات"
              ? "bg-[#F64D00] border-[#F64D00] text-white"
              : "border-[#262626] bg-[#161616] text-[#A1A1A1] hover:border-[#F64D00]"
            }`}
            >تقنيات</button>
          <button onClick={()=> filterBlogs("معدات")} 
            className={`rounded-xl cursor-pointer px-5 py-2.5 border text-md transition-all
            ${activeCategory === "معدات"
              ? "bg-[#F64D00] border-[#F64D00] text-white"
              : "border-[#262626] bg-[#161616] text-[#A1A1A1] hover:border-[#F64D00]"
            }`}
            >معدات</button>
        </div>
      </div>
      <hr className="h-6 w-full border-[#262626]" />
      <div className="blogsCards-div py-10 px-40">
        <div className="layout-buttons-div justify-between flex">
          <p className="text-[#A1A1A1] text-lg">عرض <span className="text-white font-semibold"> 28 </span>مقالة</p>
          <div className="action-btn">
            <div className="layout-buttons inline-block rounded-xl bg-[#161616] border border-[#5b5a5a] px-4 py-2">
              <button
                onClick={() => changeLayout("vertical")}
                className={`rounded-lg p-2 transition-all
                  ${activeLayout === "vertical"
                    ? "bg-[#F64D00] text-white"
                    : "text-[#A1A1A1] hover:text-[#F64D00]"
                  }`}>
                <PiSquaresFourLight className="text-2xl inline-block" />
              </button>
              <button
                onClick={() => changeLayout("horizontal")}
                className={`rounded-lg p-2 transition-all
                  ${activeLayout === "horizontal"
                    ? "bg-[#F64D00] text-white"
                    : "text-[#A1A1A1] hover:text-[#F64D00]"
                  }`}>
                <FaBars className="text-xl inline-block" />
              </button>
            </div>
            <button onClick={() => deleteFilters()} className="text-xl text-[#6F7373] inline-block ms-3 hover:text-[#F64D00]">
              <MdOutlineCancel className="text-xl inline-block" />
              مسح الفلاتر
            </button>
          </div>  
        </div>
        <div className={cardLayout 
          ? "Blogs-cards mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7" 
          : "Blogs-cards mt-8 flex flex-col gap-7"
        }>
        {filterBlogsArray.map((blog) => {
          return(
            cardLayout ? 
              <Link to={`/blog/${blog.slug}`} key={blog.id} className="group/card hover:border-[#5e3b29] flex flex-col overflow-hidden rounded-4xl border border-[#262626] bg-[#141414] hover:cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1">
              <div className="card-image relative h-64 overflow-hidden w-full">
                <img src={blog.image} alt="blog-image" className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover/card:scale-110" />
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
            </Link>: 
            <Link to={`/blog/${blog.slug}`} key={blog.id} className="group/card hover:border-[#5e3b29] flex flex-col lg:flex-row overflow-hidden rounded-4xl border border-[#262626] bg-[#141414] hover:cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1">
            <div className="card-image relative h-64 lg:h-auto w-full lg:w-2/5 overflow-hidden">
              <img src={blog.image} alt="" className="h-full w-full object-cover transition-all duration-200 ease-in-out group-hover/card:scale-110" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-8">
              <div className="blog-description">
                <div className="flex items-center gap-4">
                  <span className="rounded-2xl bg-[#FF6900] px-4 py-1 text-sm font-semibold text-white">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-2 text-[#727272] text-[14px]">
                    <FaRegClock />
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#727272] text-[14px]">
                    <MdOutlineDateRange />
                    <span>{blog.date}</span>
                  </div>
                </div>
                <h3 className="mt-4 text-2xl lg:text-3xl font-semibold text-white group-hover/card:text-[#F96F12] transition-colors">
                  {blog.title}
                </h3>
                <p className="mt-3 text-base text-[#A1A1A1]">
                  {blog.excerpt}
                </p>
              </div>
              <div className="card-end mt-6 flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#F96F12] font-medium">
                  <FaLongArrowAltLeft />
                  اقرأ المقال
                </span>
                <div className="writer-div flex items-center gap-3">
                  <div className="writer-name-div text-right">
                    <span className="block text-base font-semibold text-white">{blog.author.name}</span>
                    <span className="block text-[13px] text-[#727272]">{blog.author.role}</span>
                  </div>
                  <span className="inline-block w-12 h-12 shrink-0 border-2 border-[#262626] rounded-full overflow-hidden">
                    <img src={blog.author.avatar} className="w-full h-full object-cover object-top" alt="writer-image" />
                  </span>
                </div>
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
