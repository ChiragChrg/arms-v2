import "./Dashboard.css"
import { useState, useEffect } from "react";
import { useContextData } from "../../Hooks/useContextData"

import NavRoute from "../../Components/NavRoute/NavRoute";

const Dashboard = () => {
    const { isReturningUser, userData } = useContextData();
    const [welcomeTxt, setWelcomeTxt] = useState("Welcome to ARMS");

    useEffect(() => {
        if (isReturningUser) {
            userData?.username ? setWelcomeTxt(`Welcome back, ${userData.username}`) : setWelcomeTxt("Welcome back, User")
        }
    }, [isReturningUser, userData])

    const routes = [
        "Ganja",
        "About",
        "Contact"
    ]

    return (
        <div className="Dashboard-Main">
            <NavRoute routes={routes} />
            <h1>{welcomeTxt}</h1>
        </div>
    )
}

export default Dashboard