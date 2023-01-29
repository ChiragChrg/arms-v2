import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContextData } from "../Hooks/useContextData";

import Sidebar from "./Sidebar/Sidebar";

const Content = () => {
    const [userLogout, setUserLogout] = useState(false);
    const { onLogout, setOnLogout, setIsUserLoggedIn } = useContextData();
    const navigate = useNavigate();
    const ContentRef = useRef();

    useEffect(() => {
        if (onLogout) {
            setUserLogout(true);
            document.body.style.overflow = "hidden";
        }
    }, [onLogout])

    const Logout = () => {
        setOnLogout(false);
        setIsUserLoggedIn(false);
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="Content-Main" ref={ContentRef}>
            <Sidebar />

            <div className="Outlet-Main">
                <Outlet />
            </div>

            {userLogout &&
                <div className="Logout-Modal flex">
                    <div className="Logout-Card flex col">
                        <h3>Are you sure you want to logout?</h3>
                        <div className="Logout-Buttons flex">
                            <button onClick={() => { setUserLogout(false); setOnLogout(false) }}>Cancel</button>
                            <button className="logout" onClick={Logout}>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Content