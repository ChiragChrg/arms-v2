import "./Landing.css"
import { useContextData } from "../../Hooks/useContextData"
import { useNavigate } from "react-router-dom"
import Header from "../../Components/Header/Header"
import Trails from "../../Components/Trails/Trails"

const Landing = () => {
    const { setIsUserLoggedIn, setIsUserFaculty } = useContextData();
    const navigate = useNavigate();
    let isMobile = window.innerWidth <= 750;
    let currYear = new Date().getFullYear();

    const HandleStudentLogin = () => {
        setIsUserLoggedIn(true);
        setIsUserFaculty(false);
        localStorage.setItem('arms-isUserLoggedIn', true);
        localStorage.setItem('arms-isFacultyLoggedIn', false);
        navigate('/dashboard');
    }

    return (
        <div className="Landing-Main">
            <Header />

            <div className="Landing-Body flex col gap2">
                <div className="Landing-Intro col gap">
                    <h1><span>A</span>cademic <span>R</span>esource <span>M</span>anagement <span>S</span>ystem</h1>
                    {!isMobile ? <p>ARMS is an open-source software developed for students. <br />
                        Students can easily find and download the study materials uploaded <br /> by the college faculty.</p>
                        :
                        <p>ARMS is an open-source software developed for students. <br />
                            Students can easily find and download the study materials uploaded by the college faculty.</p>
                    }
                </div>

                <div className="Landing-Start flex col">
                    <h2>Lets get started</h2>

                    <div className="Landing-Btns flex gap">
                        <div className="Landing-Btn" onClick={HandleStudentLogin}>
                            <h3>I'm a Student</h3>
                            <p>Anonymous</p>
                        </div>

                        <div className="Landing-Btn" onClick={() => navigate('/login')}>
                            <h3>I'm a Faculty</h3>
                            <p>Login / Signup</p>
                        </div>
                    </div>
                </div>
                <div className="Landing-Footer">
                    {/* Created on 25-01-2023 */}
                    {/* <p>© Copyright 2023 - {currYear} ChiragChrg</p> */}
                    <p>© Copyright 2023 ChiragChrg</p>
                </div>
            </div>

            <Trails />
        </div>
    )
}

export default Landing