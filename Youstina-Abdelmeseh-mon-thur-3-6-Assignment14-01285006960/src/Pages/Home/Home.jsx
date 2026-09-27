import BlogsCategories from './HomeComponents/BlogsCategories'
import HeroSection from "./HomeComponents/HeroSection"
import LatestBlogs from "./HomeComponents/LatestBlogs"
import SubscribeSection from "./HomeComponents/SubscribeSection"
import SpecificBlogs from './HomeComponents/SpecificBlogs';
import { useOutletContext } from "react-router-dom";

export default function Home() {
  let {blogs, categories} = useOutletContext();
  return (
    <>
      <HeroSection/>
      <SpecificBlogs blogs={blogs}/>
      <BlogsCategories categories={categories} />
      <LatestBlogs blogs={blogs}/>
      <SubscribeSection/>
    </>
  )
}
