import "./Sidebar.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { useContextData } from "../../Hooks/useContextData"

import { FaRegUser } from "react-icons/fa"

const Sidebar = () => {
    const { setOnLogout } = useContextData();
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
                <h1>ARMS</h1>

                <div className="Sidebar-Profile">
                    <FaRegUser size={50} color="#fff" />
                    <div className="Sidebar-Profile-Name">
                        <h3>Username</h3>
                        <p>Faculty</p>
                    </div>
                </div>
            </div>

            <div className="Sidebar-Logout" onClick={() => setOnLogout(true)}>
                <button>Logout</button>
            </div>

        </div>
    )
}

export default Sidebar