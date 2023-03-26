import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useContextData } from "../Hooks/useContextData";
import axios from "axios"

import Sidebar from "./Sidebar/Sidebar";
import DeleteData from "./Modals/DeleteData";
import DeleteUser from "./Modals/DeleteUser";
import Logout from "./Modals/Logout";

const Content = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [runOnce, setRunOnce] = useState(false);

    const { onLogout, userData, isUserFaculty, setUserData,
        manageDelete, deleteUser } = useContextData();
    const ContentRef = useRef();

    useEffect(() => {
        if (onLogout) {
            document.body.style.overflow = "hidden";
        }

        const ResizeWindow = () => {
            if (window.innerWidth < 750) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        window.addEventListener('resize', ResizeWindow)
        ResizeWindow()
    }, [window.innerWidth])

    useEffect(() => {
        const GetCurrentUser = async () => {
            try {
                const res = await axios.post("/api/curruser", { userId: userData.uid })

                let data = { ...userData, isApproved: res.data.UserDB.isApproved }
                setUserData(data)
                localStorage.setItem('arms-user', JSON.stringify(data));
                setRunOnce(true)
            } catch (err) {
                console.log(err)
            }
        }

        if (!runOnce && isUserFaculty) {
            GetCurrentUser()
        }
    }, [runOnce])

    return (
        <div className="Content-Main" ref={ContentRef}>
            <Sidebar isMobile={isMobile} />

            <div className={isMobile ? "Outlet-Main fullWidth" : "Outlet-Main"} >
                <Outlet />
            </div>

            {/* Backdrop Modals for various actions */}
            {manageDelete && <DeleteData />}
            {deleteUser && <DeleteUser deleteUser={deleteUser} />}
            {onLogout && <Logout />}
        </div >
    )
}

export default Content