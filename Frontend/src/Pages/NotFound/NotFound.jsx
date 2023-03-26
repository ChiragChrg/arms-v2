import "./NotFound.css"
import { useNavigate } from "react-router-dom"
import { useContextData } from "../../Hooks/useContextData"
import { NotFoundSVG } from "../../Assets"
import ArmsLogo from "../../Assets/ArmsLogo"
import { FiArrowLeft } from "react-icons/fi"
import { HiOutlineHome } from 'react-icons/hi'

const NotFound = () => {
    const { isUserLoggedIn } = useContextData()
    const navigate = useNavigate()

    return (
        <div className="NotFound-Main">
            <div className="NotFound-Header flex">
                <ArmsLogo size={40} />
                <p>ARMS</p>
            </div>

            <div className="NotFound-Container flex col">
                <div className="flex col gap2">
                    <img src={NotFoundSVG} alt="NotFoundSVG" width="450px" />
                    {isUserLoggedIn ?
                        <h2>Oops! Page Not Found.</h2>
                        :
                        <h2>Login to Access this page</h2>
                    }
                </div>

                {isUserLoggedIn ?
                    <div className="NotFound-Btn flex gap05" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={20} />
                        <span>Back</span>
                    </div>
                    :
                    <div className="NotFound-Btn flex gap05" onClick={() => navigate("/")}>
                        <HiOutlineHome size={20} />
                        <span>Home</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default NotFound