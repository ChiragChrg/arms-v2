import { useContextData } from "../../Hooks/useContextData"
import { NavLink } from "react-router-dom"
import { BsFilterLeft } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'

const MobileHam = ({ hideProfile = false }) => {
    const { setShowSidebar, userData, isUserFaculty } = useContextData()
    console.log(hideProfile, isUserFaculty)
    return (
        <div className="MobileHam-Main flex">
            <BsFilterLeft size={45} onClick={() => setShowSidebar(true)} />

            {!hideProfile && <NavLink to="/settings" className="flex">
                {!isUserFaculty ?
                    <div className="MobileHam-ProfileImg flex">
                        <FaRegUser size={23} color="var(--grey)" />
                    </div>
                    : <img src={userData.avatar} alt={userData.username} className="MobileHam-Avatar" />
                }
            </NavLink>}
        </div>
    )
}

export default MobileHam