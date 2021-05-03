import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../sidebar/Sidebar';

const PrivateScreen = ({ history }) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("authToken")){
            history.push("/login");
        }
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
    
            try {
                const {data} = await axios.get("/api/private", config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized. Please login!!")
            }
        }
        fetchPrivateData();
    }, [history]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    return error ? (
        <span className="">{ error }</span>
    ) : (
        <>
            <Navbar />        
            <Sidebar />
        </>
    )
}

export default PrivateScreen
