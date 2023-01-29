import "./Sidebar.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useContextData } from "../../Hooks/useContextData"

import { FaRegUser } from "react-icons/fa"
import { FiLogOut } from 'react-icons/fi'
import { CgDarkMode } from 'react-icons/cg'

const Sidebar = () => {
    const { setOnLogout, setIsDarkTheme } = useContextData();
    const userEmail = "chiruchirag2001@gmail.com"
    useEffect(() => {
        // const getProfileImg = async () => {
        //     const {data} = await axios.get(`https://www.gravatar.com/avatar/${userEmail}?d=identicon&s=200}`)
        //     console.log(data)
        // }
        // getProfileImg()
    }, [])

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

            <div className="Sidebar-NavLinks flex">
                <Link to="/dashboard">Dashboard</Link>
            </div>

            <div className="Sidebar-Footer flex">
                <div className="Sidebar-FooterHolder flex">
                    <div className="Sidebar-Profile flex gap05">
                        <div className="Sidebar-ProfileImg flex">
                            <FaRegUser size={30} color="var(--primary)" />
                        </div>

                        <div className="Sidebar-ProfileInfo">
                            <h3>Username</h3>
                            <p>Faculty</p>
                        </div>
                    </div>

                    <div className="Sidebar-Logout flex" onClick={() => setOnLogout(true)}>
                        <FiLogOut size={25} color="var(--white)" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar