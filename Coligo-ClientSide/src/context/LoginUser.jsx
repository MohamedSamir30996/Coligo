import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/Coligo";

export const UserContext = createContext({});
export function UserContextProvider({ children }) {
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    
    useEffect(() => {
        axiosInstance.get('/users/profile').then((response) =>{
            setId(response.data.userId);
            setName(response.data.username);
        });
    },[])
    return (
        <UserContext.Provider value={{ name, setName, id, setId}}>
            {children}
        </UserContext.Provider>
    );
}