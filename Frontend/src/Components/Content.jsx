import { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContextData } from "../Hooks/useContextData";
import axios from "axios"
import { toast } from "react-toastify";

import Sidebar from "./Sidebar/Sidebar";
import { MdDeleteForever, MdClose } from "react-icons/md"
import { FiLoader } from "react-icons/fi"

const Content = () => {
    const [userLogout, setUserLogout] = useState(false);
    const [loading, setLoading] = useState(false);
    const { onLogout, setOnLogout, setIsUserLoggedIn,
        setIsUserFaculty, setIsReturningUser, setUserData,
        setIsAdmin, manageDelete, setManageDelete,
        setCourseStateData, setInstituteStateData, showSidebar } = useContextData();
    const navigate = useNavigate();
    const ContentRef = useRef();
    const DeleteRef = useRef();
    let isMobile = window.innerWidth < 750;

    useEffect(() => {
        if (onLogout) {
            setUserLogout(true);
            document.body.style.overflow = "hidden";
        }
    }, [onLogout])

    const Logout = () => {
        setOnLogout(false);
        setIsUserLoggedIn(false);
        setIsUserFaculty(false);
        setIsReturningUser(false);
        setUserData({});
        setIsAdmin(false);
        localStorage.clear();
        navigate("/");
    }

    const HandleDelete = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (DeleteRef.current.value !== `Delete ${manageDelete.name}`) {
            toast.warn("Invalid confirmation text!")
            setLoading(false)
            return;
        }

        if (manageDelete.title == "Subject") {
            //Delete Subject
            try {
                const res = await axios.post('/api/deletesubject', manageDelete)
                // console.log(res)

                if (res.status == 200) {
                    setLoading(false)
                    setInstituteStateData(res.data?.deletedSub)
                    setCourseStateData(res.data?.deletedSub)
                    toast.success(manageDelete.title + " Deleted Sucessfully!")
                    setManageDelete(null)
                    navigate(manageDelete.backPath, {
                        state: {
                            data: manageDelete.backState.courseInfo,
                            collegeInfo: manageDelete.backState.collegeInfo,
                        }
                    })
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            }
        } else if (manageDelete.title == "Course") {
            //Delete Course
            try {
                const res = await axios.post('/api/deletecourse', manageDelete)
                // console.log(res)

                if (res.status == 200) {
                    setLoading(false)
                    setInstituteStateData(res.data?.deletedCourse)
                    setCourseStateData(res.data?.deletedCourse)
                    toast.success(manageDelete.title + " Deleted Sucessfully!")
                    setManageDelete(null)
                    navigate(manageDelete.backPath, { state: manageDelete.backState })
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            }
        } else if (manageDelete.title == "Institute") {
            //Delete Institute
            try {
                const res = await axios.post('/api/deleteinstitute', manageDelete)
                // console.log(res)

                if (res.status == 200) {
                    setLoading(false)
                    toast.success(manageDelete.title + " Deleted Sucessfully!")
                    setManageDelete(null)
                    navigate(manageDelete.backPath)
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            }
        }
    }

    return (
        <div className="Content-Main" ref={ContentRef}>
            <Sidebar isMobile={isMobile} />

            <div className={isMobile ? "Outlet-Main fullWidth" : "Outlet-Main"} >
                <Outlet />
            </div>

            {userLogout &&
                <div className="BackropModal flex">
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

            {manageDelete &&
                <div className="BackropModal flex">
                    <div className="Manage-Delete flex col">
                        <div className="Manage-Header flex">
                            <h2>Delete {manageDelete.title}</h2>
                            <MdClose size={30} color="var(--red)" className="Manage-Close" onClick={() => setManageDelete(null)} />
                        </div>

                        <h4>Confirm to delete <span style={{ color: "var(--primary)" }}>{manageDelete.name.toUpperCase()}</span> ? <br /> This will delete all the uploaded documents in this {manageDelete.title.toLowerCase()}.</h4>

                        <form className="Manage-Form flex col gap" onSubmit={HandleDelete} >
                            <div className="NewInstitute-InputHolder flex col">
                                <label >Type "Delete {manageDelete.name}" to confirm</label>
                                <div className="NewInstitute-Input flex gap05">
                                    <input type="text" maxLength={7 + manageDelete.name.length} placeholder={`Delete ${manageDelete.name}`} ref={DeleteRef} required />
                                </div>
                            </div>

                            <button type="submit" className="Manage-DeleteBtn flex">
                                {!loading ?
                                    <div className="flex gap05">
                                        <MdDeleteForever size={25} color="inherit" />
                                        <span>Delete {manageDelete.title}</span>
                                    </div>
                                    :
                                    <FiLoader size={25} color="inherit" style={{ animation: "spin 2s linear infinite" }} />}
                            </button>
                        </form>
                    </div>
                </div>
            }

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div >
    )
}

export default Content