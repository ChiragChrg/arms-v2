import "./Dashboard.css"
import { useEffect } from "react";
import { useContextData } from "../../Hooks/useContextData"

const Dashboard = () => {
    const { isReturningUser, userData } = useContextData();
    let welcomeTxt = "Welcome to ARMS";

    useEffect(() => {
        if (isReturningUser)
            userData?.username ? welcomeTxt = `Welcome back, ${userData.username}` : welcomeTxt = "Welcome back, User"
    }, [isReturningUser, userData])


    return (
        <div className="Dashboard-Main">
            <h1>{welcomeTxt}</h1>
        </div>
    )
}

export default Dashboard