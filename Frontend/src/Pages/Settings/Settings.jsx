import "./Settings.css"
import { useContextData } from "../../Hooks/useContextData"
import MobileHam from "../../Components/MobileHam/MobileHam"

import { FiCheck, FiClock, FiLogOut } from "react-icons/fi"
import { FaRegUser } from "react-icons/fa"
import { CgDarkMode } from "react-icons/cg"

const Settings = () => {
    const { userData, isAdmin, isUserFaculty, isDarkTheme, setIsDarkTheme, setOnLogout } = useContextData()

    return (
        <div className="Settings-Main">
            <MobileHam hideProfile={true} />
            <h1>Settings</h1>

            <div className="Settings-User flex col gap05">
                <div className="Settings-Profile">
                    <div className="Settings-DashBorder"></div>
                    {!isUserFaculty ?
                        <div className="Settings-ProfileImg flex">
                            <FaRegUser size={58} color="var(--white)" />
                        </div>
                        : <img src={userData.avatar} alt={userData.username} className="Settings-Avatar" />
                    }
                </div>

                <div className="Settings-UserDetails flex col">
                    <h3>{userData?.username}</h3>
                    <p>{userData?.email}</p>
                </div>
            </div>

            <h2>User Details</h2>
            <div className="Settings-Details flex gap">
                <div className="Settings-UserInfo flex col gap05">
                    <div className="Settings-InfoCol">
                        <span>Username </span>
                        <p>{userData.username}</p>
                    </div>
                    {userData.email && <div className="Settings-InfoCol">
                        <span>Email </span>
                        <p>{userData.email}</p>
                    </div>}
                    <div className="Settings-InfoCol">
                        <span>Role </span>
                        <p>{isAdmin ? "Admin" : isUserFaculty ? "Faculty" : "Student"}</p>
                    </div>
                    {(isUserFaculty && !isAdmin) && <div className="Settings-InfoCol">
                        <span>Approval Status </span>
                        {userData.isApproved ?
                            <p className="flex gap05">
                                <FiCheck size={20} color="var(--green)" />
                                Approved
                            </p>
                            :
                            <p className="flex gap05">
                                <FiClock size={20} color="gold" />
                                Pending
                            </p>}
                    </div>}
                </div>

                <div className="Settings-Actions flex col">
                    <div className="Settings-ActionCol flex">
                        <span>Switch Theme </span>
                        <div className="Settings-ThemeToggle flex gap" onClick={() => setIsDarkTheme(prev => !prev)}>
                            <CgDarkMode size={25} color="inherit" />
                            {isDarkTheme ? "Light" : "Dark"}
                        </div>
                    </div>

                    <div className="Settings-ActionCol Logout flex">
                        <div className="Settings-Logout flex gap" onClick={() => setOnLogout(true)}>
                            <FiLogOut size={25} color="inherit" />
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings