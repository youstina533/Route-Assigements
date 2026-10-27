import { createContext, useState, useEffect , type Dispatch, type SetStateAction, type ReactNode } from "react";
import {jwtDecode} from "jwt-decode"

type AuthContextType ={
  userToken: string | null,
  setuserToken : Dispatch<SetStateAction<string | null>>, 
  userId: string,
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext =  createContext<AuthContextType>({
    userToken: null, 
    setuserToken: () => {}, 
    userId: ""
});

export default function AuthContextProvider({children} : {children: ReactNode }){
    const [userToken, setuserToken] = useState(function(){return localStorage.getItem("userToken")}); 

    const [userId, setuserId] = useState("");

    useEffect(()=>{
    const token = localStorage.getItem("userToken");
    if (token) {
      const { user }: { user: string } = jwtDecode(token);
      setuserId(user);
   }  
   }, [userToken])

    return <AuthContext.Provider value={{userToken,setuserToken, userId}}>
            {children}
         </AuthContext.Provider> 
}