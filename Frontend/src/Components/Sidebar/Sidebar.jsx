import "./Sidebar.css"
import { NavLink } from "react-router-dom"
import { useContextData } from "../../Hooks/useContextData"

import { FaRegUser } from "react-icons/fa"
import { FiLogOut } from 'react-icons/fi'
import { CgDarkMode } from 'react-icons/cg'
import { MdDashboard } from 'react-icons/md'
import { BsInfoCircleFill } from 'react-icons/bs'
import { RiContactsBookLine } from 'react-icons/ri'

const Sidebar = () => {
    const { userData, setOnLogout, setIsDarkTheme, isUserFaculty } = useContextData();

    return (
        <div className="Sidebar-Main flex col">
            <div className="Sidebar-Header">
                <div className="Sidebar-LogoTheme flex">
                    <h1>ARMS</h1>
                    <div className="Sidebar-ThemeToggle flex" onClick={() => setIsDarkTheme(prev => !prev)}>
                        <CgDarkMode size={30} color="inherit" />
                    </div>
                </div>
            </div>

            <div className="Sidebar-NavLinks flex col gap">
                <NavLink to="/dashboard" className="flex gap">
                    <MdDashboard size={25} color="inherit" />Dashboard
                </NavLink>
                <NavLink to="/about" className="flex gap">
                    <BsInfoCircleFill size={25} color="inherit" />About
                </NavLink>
                <NavLink to="/contact" className="flex gap">
                    <RiContactsBookLine size={25} color="inherit" />Contact
                </NavLink>
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
                            <p>{isUserFaculty ? "Faculty" : "Student"}</p>
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