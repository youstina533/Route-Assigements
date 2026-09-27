import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import {Outlet} from "react-router-dom"
import axios from 'axios'
import { useEffect, useState} from 'react';
import { Oval } from 'react-loader-spinner'
import ScrollToUp from "./ScrollToUp";

export default function Layout() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [siteInfo, setSiteInfo] = useState(null);   

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await axios.get('/posts.json');
        setBlogs(data.posts);
        setCategories(data.categories);
        setSiteInfo(data.siteInfo);   // object
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    getPosts();
  }, []);

  return (
    <>
      <ScrollToUp />
      <Navbar />

      {blogs.length > 0 ? (
        <Outlet context={{ blogs, categories, siteInfo }} />
      ) : (
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
        />
      )}
      {siteInfo && <Footer siteInfo={siteInfo} />}
    </>
  );
}
