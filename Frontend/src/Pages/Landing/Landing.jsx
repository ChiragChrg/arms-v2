import "./Landing.css"
import { useContextData } from "../../Hooks/useContextData"
import { useNavigate } from "react-router-dom"
import Header from "../../Components/Header/Header"

const Landing = () => {
    const { setIsUserLoggedIn, setIsUserFaculty } = useContextData();
    const navigate = useNavigate();
    let currYear = new Date().getFullYear();
    // const StripCount = [1, 2]
    const StripCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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

            <div className="Landing-Clip">
                <div className="Landing-StripHolder flex col gap2">
                    {StripCount.map((item) => {
                        return <div key={item} className="Landing-Strip flex"></div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Landing