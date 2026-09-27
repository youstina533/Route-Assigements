import { FaListUl, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import {Link} from "react-router-dom";
import { FaCamera } from "react-icons/fa6";
import { FaTags } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";

export default function BlogDetails({blog}) {
  function parseContent(content) {
    const sections = [];
    const parts = content.split(/\n## /);

    if (parts[0].trim()) {
      sections.push({
        title: null,      
        content: parts[0].trim()
      });
    }

    for (let i = 1; i < parts.length; i++) {
      const [title, ...rest] = parts[i].split("\n");
      sections.push({
        title: title.trim(),
        content: rest.join("\n").trim()
      });
    }
    return sections;
  }
  const sections = parseContent(blog.content);

  return (
    <>
    <section className="blog-details pt-2 bg-[#0A0A0A] px-40">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-9 blog-information me-5">
          <div className="blog-aim bg-[#261a0dca] px-7 py-7 border-2 border-[#4A2307] rounded-2xl">
            <p className="blog-brief text-[#C8D4D4] text-xl">"{blog.excerpt}"</p>
          </div>ن.
          <p className="blog-start text-[#C8D4D4] text-xl mt-8">{sections[0].content}</p>
          {sections.slice(1).map((section, i) => {
            return (
              <div key={i} id={`section-${i+1}`} className="scroll-mt-28">
                <div className="point-title mb-3 flex items-center gap-5 mt-16">
                  <span className="camera-icon px-1 py-1 border border-[#662C06] bg-[#261a0dca] rounded-xl">
                    <FaCamera className="inline-block text-4xl text-[#FF6900]" />
                  </span>
                  <h3 className="text-white text-[34px] font-semibold mb-4">
                    {section.title}
                  </h3>
                </div>
                <p className="text-[#CDCDD4] text-xl">
                  {section.content}
                </p>
              </div>
            )
          })}
          <div className="tags-section mt-16 bg-[#111111] border border-[#262626] px-5 py-7 mb-5 rounded-2xl">
            <div className="tags-div-title flex gap-4 items-center mb-7">
              <span className="tags-icon px-3 py-2.5 border border-[#662C06] bg-[#261a0dca] rounded-xl">
                <FaTags className="inline-block text-xl text-[#FF6900]"/>
              </span>
              <h4 className="text-white text-xl font-semibold">الوسوم</h4>
            </div>
            {blog.tags.map((tag)=> {
              return(
                <span className="tag me-3 bg-[#1A1A1A] border border-[#262626] rounded-3xl px-4 py-2 text-[#6b7173] hover:border-[#FF6900] hover:text-[#FF6900] ">
                  #{tag}
                </span>
              )
            })}
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-4">
          <div className="sticky top-30 z-0 flex flex-col gap-4">
            <div className="blog-notes flex flex-col gap-4">
              <div className="rounded-2xl border border-[#262626] bg-[#111111] px-6 py-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-10.5 w-10.5 items-center justify-center rounded-xl border border-[#964409d1] bg-[#281d17f0] text-[#FF6900]">
                    <FaListUl />
                  </span>
                  <h3 className="text-lg font-bold text-white">محتويات المقال</h3>
                </div>
                <ul className="mt-6 flex flex-col ">
                  {sections.slice(1).map((section, i) => (
                    <li key={i}>
                      <div className="flex gap-3 items-center mt-3 group/title hover:rounded-xl hover:bg-[#1d1510e3] px-3 py-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1A1A1A] text-xs font-medium text-[#737373] group-hover/title:text-[#FF6900] group-hover/title:bg-[#36271ef0]">
                          {i + 1}
                        </span>
                        <span className="blog-titles">
                          <a href={`#section-${i+1}`} className="flex items-center justify-between py-3.5 text-[#A1A1A1] group-hover/title:text-[#FF6900]">
                            <span>{section.title}</span>
                          </a>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 bg-[#111111] border border-[#262626] rounded-2xl p-4">
                <div className="flex flex-col items-center gap-2 rounded-2xl border bg-[#070707] px-3 py-6 text-center">
                  <FaRegClock className="text-2xl text-[#F96F12]" />
                  <span className="text-lg font-bold text-white"> {blog.readTime}</span>
                  <span className="text-sm text-[#727272]">وقت القراءة</span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#080808] px-3 py-6 text-center">
                  <FaRegCalendarAlt className="text-2xl text-[#F96F12]" />
                  <span className="text-lg font-bold text-white">{blog.date} </span>
                  <span className="text-sm text-[#727272]">تاريخ النشر</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 pb-18">
        <div className="col-span-9 me-5">
          <div className="share-section mt-5 bg-[#111111] border border-[#262626] px-5 py-3 mb-6 rounded-2xl flex justify-between items-center">
           <div className="tags-div-title flex gap-4 items-center mb-7">
              <span className="tags-icon px-3 py-2.5 border border-[#662C06] bg-[#261a0dca] rounded-xl">
                <FaShareNodes className="inline-block text-xl text-[#FF6900]"/>
              </span>
              <h4 className="text-white text-xl font-semibold">شارك المقال</h4>
            </div>
            <div className="social-media-links flex gap-3">
             <Link to="https://x.com/" className="border border-[#262626] bg-[#1A1A1A] px-3.5 py-3 rounded-2xl hover:bg-[#1DA1F2] group/socialLink">
              <FaXTwitter className="inline-block text-xl text-[#A1A1A1] group-hover/socialLink:text-white"/>
             </Link>
             <Link to="https://www.linkedin.com/" className="border border-[#262626] bg-[#1A1A1A] px-3.5 py-3 rounded-2xl hover:bg-[#1DA1F2] group/socialLink">
              <FaLinkedinIn className="inline-block text-xl text-[#A1A1A1] group-hover/socialLink:text-white"/>
             </Link>
             <Link to="https://whatsapp.com/" className="border border-[#262626] bg-[#1A1A1A] px-3.5 py-3 rounded-2xl hover:bg-[#25D366] group/socialLink">
              <FaWhatsapp className="inline-block text-xl text-[#A1A1A1] group-hover/socialLink:text-white"/>
             </Link>
             <Link to="https://x.com/" className="border border-[#262626] bg-[#1A1A1A] px-3.5 py-3 rounded-2xl hover:bg-[#FF6900] group/socialLink">
              <FaLink  className="inline-block text-xl text-[#A1A1A1] group-hover/socialLink:text-white"/>
             </Link>
            </div>
          </div>
          <div className="blog-writer-section">
            <div className="rounded-3xl border border-[#262626] bg-[#141414] py-4.5 px-6">
              <div className="flex items-center gap-4">
                <img src={blog.author.avatar} alt="writer" className="h-25 w-25 shrink-0 rounded-2xl border-4 border-[#662C06] object-cover object-top" />
                <div>
                  <span className="text-sm font-bold text-[#F96F12]">كاتب المقال</span>
                  <h3 className="mt-1 text-xl font-bold text-white"> {blog.author.name}</h3>
                  <span className="text-sm text-[#727272]">{blog.author.role} </span>
                  <p className="mt-4 text-[#A1A1A1]">
                    {blog.author.role}  شغوف بمشاركة المعرفة والخبرات في عالم التصوير الفوتوغرافي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 mt-10">
          <div className="dont-miss-div relative z-10">
            <div className="flex flex-col items-center rounded-3xl border border-[#4A2307] bg-linear-to-b from-[#2a1a0f] to-[#141414] p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#FF7300] to-[#FF4D00] text-2xl text-white">
                <FaRegEnvelope />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">لا تفوّت جديدنا</h3>
              <p className="mt-1 text-sm text-[#A1A1A1]">اشترك للحصول على أحدث المقالات</p>
              <Link to="/blog" className="mt-5 w-full rounded-full bg-linear-to-r from-[#FF7300] to-[#FF4D00] py-3 font-bold text-white transition-all duration-200 hover:-translate-y-1">
                تصفح المزيد
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
