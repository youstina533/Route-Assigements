import Home from './Pages/Home/Home';
import Blog from './Pages/Blog/Blog';
import Blogs from './Pages/Blogs/Blogs';
import Layout from './Layout/Layout';
import NotFound from './Pages/NotFound/NotFound';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const routes = createBrowserRouter([
    {
      path : "",
      element: <Layout /> ,
      children: [
        {index: true, element: <Home />},
        { path: "blog", element: <Blogs /> },
        { path: "blog/:blogSlug", element: <Blog /> }, 
        { path: "*", element: <NotFound/> }
      ]
    }
  ])
  return (
    <>
      <div className="w-full">
        <RouterProvider router={routes}></RouterProvider>
      </div>
    </>
  )
}

export default App
