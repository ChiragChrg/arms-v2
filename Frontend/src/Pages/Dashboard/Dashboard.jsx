import "./Dashboard.css"
import { useContextData } from "../../Hooks/useContextData"

const Dashboard = () => {
    const { isReturningUser } = useContextData();


    return (
        <div className="Dashboard-Main">
            <h1>{isReturningUser ? "Welcome back, User" : "Welcome to ARMS"}</h1>
        </div>
    )
}

export default Dashboard