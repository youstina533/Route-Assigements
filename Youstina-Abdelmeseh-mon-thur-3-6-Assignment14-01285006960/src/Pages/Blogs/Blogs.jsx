import HeroSection from "./BlogsComonents/HeroSection"
import BlogsDev from "./BlogsComonents/BlogsDev"
import { useOutletContext } from "react-router-dom";

export default function Blogs() {
   let {blogs} = useOutletContext();
  return (
    <>
      <HeroSection />
      <BlogsDev blogs={blogs} />
    </>
  )
}
