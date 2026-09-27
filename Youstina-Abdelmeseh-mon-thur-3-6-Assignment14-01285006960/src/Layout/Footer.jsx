import {Link} from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
export default function Footer(props) {
     let {siteInfo} = props
  return (
    <>
    <footer className="static bottom-0 bg-[#0A0A0A] z-50 w-full m-0">
      <div className=" px-40 p-8 border-t border-t-[#424141] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-15 pt-17 m-0">
        <div className="website-socials-div">
          <div className="website-title flex gap-3 items-center">
            <span className="px-5 py-3 text-white font-bold text-xl rounded-2xl bg-[#FE5C00] transition-all duration-200  hover:scale-105">ع</span>
            <span className="text-2xl font-medium text-white">عدسة</span>
          </div>
          <div className="website-description text-[#737373] mt-7">
            <p>مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم.</p>
          </div>
          <div className="social-links flex gap-3 mt-6">
            <Link to={siteInfo.social.twitter || "#"} className="p-3 border border-[#242424] text-[#737373] rounded-2xl bg-[#161616] text-xl hover:bg-[#FC5A00] hover:text-white transition-all duration-200 hover:scale-110 "> <FaXTwitter /></Link>
            <Link to={siteInfo.social.github || "#"}  className="p-3 border border-[#242424] text-[#737373] rounded-2xl bg-[#161616] text-xl hover:bg-[#FC5A00] hover:text-white transition-all duration-200 hover:scale-110 "><FaGithub /></Link>
            <Link to={siteInfo.social.linkedin || "#"}  className="p-3 border border-[#242424] text-[#737373] rounded-2xl bg-[#161616] text-xl hover:bg-[#FC5A00] hover:text-white transition-all duration-200 hover:scale-110 "><FaLinkedin /></Link>
            <Link to={siteInfo.social.youtube || "#"}  className="p-3 border border-[#242424] text-[#737373] rounded-2xl bg-[#161616] text-xl hover:bg-[#FC5A00] hover:text-white transition-all duration-200 hover:scale-110 "> <FaYoutube /></Link>
          </div>
        </div>
        <div className="discover-links-div">
          <div className="links-title">
            <div className="w-9 h-0.5 inline-block bg-linear-to-r from-[#FE5E00] to-[#F4A800] me-4"></div>
            <span className="font-medium text-xl text-white">استكشف</span>
          </div>
          <div className="footerLinksColumn mt-6">
            <p><Link to="/" className="inline-block text-[#737373] text-md hover:text-[#FE5E00] transition-all duration-200 hover:-translate-x-2.5 mb-4">الرئيسية</Link></p>
            <p><Link to="blog" className="inline-block text-[#737373] text-md hover:text-[#FE5E00] transition-all duration-200 hover:-translate-x-2.5 mb-4 ">المدونة</Link></p>
            <p><Link to="who" className="inline-block text-[#737373] text-md hover:text-[#FE5E00] transition-all duration-200 hover:-translate-x-2.5 mb-4">من نحن</Link></p>
          </div>
        </div>
        <div className="discover-links-div">
          <div className="links-title">
            <div className="w-9 h-0.5 inline-block bg-linear-to-r from-[#FE5E00] to-[#F4A800] me-4"></div>
            <span className="font-medium text-xl text-white">التصنيفات</span>
          </div>
          <div className="footerLinksColumn mt-6">
            <p><Link to="/blog?category=إضاءة" className="inline-block text-[#737373] text-base hover:text-[#FE5E00] transition-all duration-200 hover:-translate-x-2.5 mb-4 ">إضاءة</Link></p>
            <p><Link to="/blog?category=بورتريه" className="inline-block text-[#737373] text-base hover:text-[#FE5E00] transition-all duration-200 hover:-translate-x-2.5 mb-4 ">بورتريه</Link></p>
            <p><Link to="/blog?category=مناظر طبيعية" className="inline-block text-[#737373] text-base hover:text-[#FE5E00] transition-all duration-200 hover:-translate-x-2.5 mb-4">مناظر طبيعية</Link></p>
            <p><Link to="/blog?category=تقنيات" className="inline-block text-[#737373] text-base hover:text-[#FE5E00] transition-all duration-200 hover:-translate-x-2.5 mb-4">تقنيات</Link></p>
          </div>
        </div>
        <div className="conatact-div">
          <div className="contact-title">
            <div className="w-9 h-0.5 inline-block bg-linear-to-r from-[#FE5E00] to-[#F4A800] me-4"></div>
            <span className="font-medium text-xl text-white">ابقى على اطلاع</span>
          </div>
          <div className="contact-description mt-4">
            <p className="text-[#737373] text-md">اشترك للحصول على أحدث المقالات والتحديثات.</p>
          </div>
          <div className="contact-form mt-4">
            <input placeholder="ادخل بريدك الالكتروني" className="placeholder:text-[#6E6E6E] bg-[#161616] text-white focus:outline-none focus:border-2 focus:border-amber-700 border border-[#262626] rounded-xl px-3 py-2.5 w-full"></input>
            <button className="read-btn inline bg-[#EE600F] rounded-4xl px-10 py-4 cursor-pointer text-lg text-[white] transition-all duration-300 ease-in-out hover:-translate-y-0.5 mt-3.5 w-full">اشترك</button>
          </div>
        </div>
      </div>
      <hr className="border-[#2c2c2b] w-full mt-6 borde"></hr>
      <div className="footer-end-div pb-2 mt-5 flex justify-between px-40">
        <p className="text-[#737373] text-md ">© 2026 عدسة. صنع بكل <FaHeart className="inline text-[#FE5E00]"/> جميع الحقوق محفوظة.</p>
      </div>
    </footer>

    </>
  )
}
