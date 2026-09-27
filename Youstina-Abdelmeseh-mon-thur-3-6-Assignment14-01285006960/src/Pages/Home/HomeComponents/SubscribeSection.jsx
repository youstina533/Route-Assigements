import { FaRegEnvelope } from "react-icons/fa";
import writerImage from '../../../assets/images/writer-image.jfif'
export default function SubscribeSection() {
  return (
     <>
    <section className="py-20 bg-[#0A0A0A]">
      <div className="subscribtion-div rounded-4xl border border-[#262626] bg-[#141414] px-6 py-16 text-center w-[55%] m-auto">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-[#FF7300] to-[#FF4D00] text-3xl text-white">
            <FaRegEnvelope />
          </span>
          <h2 className="mt-8 text-3xl font-bold text-white lg:text-[42px]">
            اشترك في <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F97F18] to-[#FBB823]">نشرتنا الإخبارية</span>
          </h2>
          <p className="mt-4 text-base text-[#A1A1A1] lg:text-lg mb-7">
            احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني
          </p>
          <div className="subscription-btns flex">
            <input type="email" placeholder="أدخل بريدك الإلكتروني" className="flex-1 me-3 placegolder:text-start rounded-2xl border border-[#262626] bg-[#0a0a0a] px-25 py-4 text-white outline-none transition-all duration-200 placeholder:text-[#6E6E6E] focus:border-[#FE5E00]"/>
            <button type="submit" className=" inline-block rounded-xl bg-linear-to-r from-[#FF7300] to-[#FF4D00] px-10 py-4 font-bold text-white hover:bg-[#D03800]">
              اشترك الآن
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-sm text-[#727272]">
            <div className="flex items-center gap-3">
              <div className="flex">
                <img src={writerImage} alt="" className="h-9 w-9 rounded-full border-2 border-[#141414] object-cover object-top" />
                <img src={writerImage} alt="" className="-ms-3 h-9 w-9 rounded-full border-2 border-[#141414] object-cover object-top" />
                <img src={writerImage} alt="" className="-ms-3 h-9 w-9 rounded-full border-2 border-[#141414] object-cover object-top" />
              </div>
              <span>
                انضم لـ <b className="text-white">+10,000</b> مصور
              </span>
            </div>
            <span className="hidden sm:inline">·</span>
            <span>بدون إزعاج</span>
            <span className="hidden sm:inline">·</span>
            <span>إلغاء الاشتراك في أي وقت</span>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
