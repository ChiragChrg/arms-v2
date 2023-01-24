import "./Landing.css"
import { useContextData } from "../../Hooks/useContextData"
import { useNavigate } from "react-router-dom"

import { CgDarkMode } from 'react-icons/cg'

const Landing = () => {
    const { setIsUserLoggedIn, setIsUserFaculty, setIsDarkTheme } = useContextData();
    const navigate = useNavigate();
    let currYear = new Date().getFullYear();

    const HandleStudentLogin = () => {
        setIsUserLoggedIn(true);
        setIsUserFaculty(false);
        localStorage.setItem('arms-isUserLoggedIn', true);
        localStorage.setItem('arms-isFacultyLoggedIn', false);
        navigate('/dashboard');
    }

    const HandleFacultyLogin = () => {
        setIsUserLoggedIn(true);
        setIsUserFaculty(true);
        localStorage.setItem('arms-isUserLoggedIn', true);
        localStorage.setItem('arms-isFacultyLoggedIn', true);
        navigate('/dashboard');
    }

    return (
        <div className="Landing-Main">
            <div className="Landing-Header">
                <div className="Landing-Logo">
                    ARMS
                </div>

                <div className="Landing-Nav flex gap2">
                    <a href="https://devbase.netlify.app/">DevBase</a>
                    <a href="https://github.com/ChiragChrg/ARMS">GitHub</a>

                    <div className="Landing-ThemeToggle flex" onClick={() => setIsDarkTheme(prev => !prev)}>
                        <CgDarkMode size={25} color="var(--white)" />
                    </div>
                </div>
            </div>

            <div className="Landing-Body flex col">
                <div className="Landing-Intro flex col">
                    <h1>Academic Resource Management System</h1>
                    <p>ARMS is an open-source software developed for the Education system. <br />
                        Students can easily find and download the study materials uploaded by the faculty.</p>
                </div>

                <div className="Landing-Start flex col">
                    <h2>Lets get started</h2>

                    <div className="Landing-Btns flex gap">
                        <div className="Landing-Btn" onClick={HandleStudentLogin}>
                            <h3>I'm a Student</h3>
                            <p>Anonymous</p>
                        </div>

                        <div className="Landing-Btn" onClick={HandleFacultyLogin}>
                            <h3>I'm a Faculty</h3>
                            <p>Login/Register</p>
                        </div>
                    </div>
                </div>
                <div className="Landing-Footer">
                    {/* Created on 25-01-2023 */}
                    {/* <p>© Copyright 2023 - {currYear} ChiragChrg</p> */}
                    <p>© Copyright 2023 ChiragChrg</p>
                </div>
            </div>

            <div className="Landing-Clip">
            </div>
        </div>
    )
}

export default Landing