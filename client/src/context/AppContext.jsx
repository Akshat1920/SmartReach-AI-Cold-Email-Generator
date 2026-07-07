import { useContext, useState, createContext, Children, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const useAppContext = () => useContext(AppContext); 



export const AppContextProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            try {
                const user = JSON.parse(userInfo);
                setUser(user);

                axios.defaults.headers.common["Authorization"] =
            `Bearer ${user.token}`;
            } catch (error) {
                localStorage.removeItem('userInfo');
            }
        }
        setLoading(false);
    }, [])



const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] =
        `Bearer ${userData.token}`;
    setUser(userData)
}

const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common["Authorization"];

    setUser(null);
}


 return (
    
    <AppContext.Provider value={{ user , login , logout, loading , axios}}>
        {children}
    </AppContext.Provider>
)

}

