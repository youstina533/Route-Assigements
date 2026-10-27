import Layout from './Layout/Layout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import AuthContextProvider from './Context/AuthContextValue';
import BeforeLoggingProtectedRoute from "./ProtectedRoute/BeforeLoggingProtectedRoute"
import AfterLoggingProtectedRoute from './ProtectedRoute/AfterLoggingProtectedRoute';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import PostDetails from './Pages/PostDetails/PostDetails';
import { Toaster } from 'react-hot-toast';
import {useNetworkState} from  'react-use'
import Offline from './Components/Offline/Offline';



const query = new QueryClient();

const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout/>,
      children: [
        {index :true, element: <BeforeLoggingProtectedRoute> <Home/> </BeforeLoggingProtectedRoute>},
        {path: "home", element: <BeforeLoggingProtectedRoute> <Home/> </BeforeLoggingProtectedRoute>},
        {path: "profile", element: <BeforeLoggingProtectedRoute> <Profile/> </BeforeLoggingProtectedRoute>},
        {path: "postdetails/:id", element: <BeforeLoggingProtectedRoute> <PostDetails/> </BeforeLoggingProtectedRoute>},
        {path: "login", element: <AfterLoggingProtectedRoute> <Login/> </AfterLoggingProtectedRoute> },
        {path:"register", element: <AfterLoggingProtectedRoute> <Register/> </AfterLoggingProtectedRoute> }
      ]
    }
  ])

function App() {

  const {online} = useNetworkState();

  return (
    <>
    {!online && <Offline/>}
      <QueryClientProvider client = {query}>
        <AuthContextProvider>
          <Toaster/>
          <RouterProvider router={routers}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
