import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContextData } from "../Hooks/useContextData";

const Content = () => {
    const [isLogout, setIsLogout] = useState(false);
    const { onLogout, setOnLogout } = useContextData();
    const navigate = useNavigate();
    const ContentRef = useRef();


    useEffect(() => {
        if (onLogout) {
            setIsLogout(true);
        }
    }, [onLogout])

    const Logout = () => {
        setOnLogout(false);
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="Content-main" ref={ContentRef}>
            <Outlet />

            {isLogout &&
                <div className="Logout-Modal flex">
                    <div className="Logout-Card flex col">
                        <h3>Are you sure you want to logout?</h3>
                        <div className="Logout-Buttons flex">
                            <button onClick={() => { setIsLogout(false); setOnLogout(false) }}>Cancel</button>
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