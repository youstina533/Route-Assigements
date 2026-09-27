import BlogDetails from "./BlogComponents/BlogDetails"
import BlogsMayBeLoved from "./BlogComponents/BlogsMayBeLoved"
import HeroSection from "./BlogComponents/HeroSection"
import { useOutletContext,useParams } from "react-router-dom";


export default function Blog() {
  let {blogs} = useOutletContext();
  let { blogSlug } = useParams();
  let blog = blogs.find((b) => b.slug === blogSlug);
  if (!blog) {
    return <div className="text-white p-20">المقال غير موجود</div>;
  }
  return (
    <>
      <HeroSection blog={blog} /> 
      <BlogDetails blog={blog} />
      <BlogsMayBeLoved blogs={blogs} currentSlug={blogSlug} /> 
    </>
  )
}
