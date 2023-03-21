import "./Sidebar.css"
import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import { useContextData } from "../../Hooks/useContextData"

import ArmsLogo from "../../Assets/ArmsLogo"
import { FaRegUser } from "react-icons/fa"
import { FiLogOut } from 'react-icons/fi'
import { CgDarkMode } from 'react-icons/cg'
// import { MdDashboard } from 'react-icons/md'
import { HiOutlineHome } from 'react-icons/hi'
import { BsInfoCircleFill, BsXCircle } from 'react-icons/bs'

import { RiContactsBookLine } from 'react-icons/ri'

const Sidebar = ({ isMobile }) => {
    const { userData, setOnLogout, setIsDarkTheme, isUserFaculty, isAdmin, showSidebar, setShowSidebar } = useContextData();
    const [role, setRole] = useState("Student");
    const SidebarRef = useRef()

    useEffect(() => {
        if (isUserFaculty) {
            isAdmin ? setRole("Admin") : setRole("Faculty")
        }

        if (isMobile) {
            // console.log(showSidebar)
            if (showSidebar) {
                SidebarRef.current.style.width = "100%"
                SidebarRef.current.style.visibility = "visible"
                SidebarRef.current.style.padding = "0.6em"
            } else {
                SidebarRef.current.style.width = "0%"
                SidebarRef.current.style.padding = "0"
                SidebarRef.current.style.visibility = "hidden"
            }
        } else {
            SidebarRef.current.style.width = "23%"
            SidebarRef.current.style.visibility = "visible"
        }
    }, [isUserFaculty, isAdmin, showSidebar, isMobile])

    return (
        <div className="Sidebar-Main flex col" ref={SidebarRef}>
            <div className="Sidebar-Header flex">
                <div className="Sidebar-MobNavHam flex" style={{ display: "none" }} onClick={() => setShowSidebar(false)}>
                    <BsXCircle size={30} color="inherit" />
                </div>

                <div className="Sidebar-HeadMain flex">
                    <div className="Sidebar-Logo flex">
                        <ArmsLogo size={35} fill="var(--white)" stroke="var(--secondary)" />
                        <p>ARMS</p>
                    </div>

                    <div className="Sidebar-ThemeToggle flex" onClick={() => setIsDarkTheme(prev => !prev)}>
                        <CgDarkMode size={35} color="inherit" />
                    </div>
                </div>
            </div>

            <div className="Sidebar-NavLinks flex col gap">
                <NavLink to="/dashboard" className="flex gap" onClick={() => setShowSidebar(false)}>
                    <HiOutlineHome size={25} color="inherit" />Dashboard
                </NavLink>
                <NavLink to="/about" className="flex gap" onClick={() => setShowSidebar(false)}>
                    <BsInfoCircleFill size={25} color="inherit" />About
                </NavLink>
                {/* <NavLink to="" className="flex gap" onClick={() => setShowSidebar(false)}>
                    <RiContactsBookLine size={25} color="inherit" />Contact
                </NavLink> */}
            </div>

            <div className="Sidebar-Footer flex col gap">
                <div className="Sidebar-FooterHolder flex">
                    <div className="Sidebar-Profile flex gap05">
                        {!isUserFaculty ?
                            <div className="Sidebar-ProfileImg flex">
                                <FaRegUser size={30} color="var(--white)" />
                            </div>
                            : <img src={userData.avatar} alt={userData.username} className="Sidebar-Avatar" />
                        }

                        <div className="Sidebar-ProfileInfo">
                            <h3>{userData?.username || "Anonymous"}</h3>
                            <p>{role}</p>
                        </div>
                    </div>

                    <div className="Sidebar-Logout flex" title="Logout" onClick={() => setOnLogout(true)}>
                        <FiLogOut size={25} color="var(--white)" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar