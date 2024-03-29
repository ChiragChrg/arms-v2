import "./Login.css"
import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useContextData } from "../../Hooks/useContextData"
import { toast } from "react-toastify"
import axios from "axios"

import Header from "../../Components/Header/Header"
import Trails from "../../Components/Trails/Trails"
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn"

import { PeopleSVG, UploadSVG } from "../../Assets"
import { MdAlternateEmail } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const { setIsUserLoggedIn, setIsUserFaculty, setUserData } = useContextData();

    const navigate = useNavigate();
    let isMobile = window.innerWidth <= 750;

    const emailRef = useRef();
    const passwordRef = useRef();

    const HandleLogin = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value.toLowerCase();
        const password = passwordRef.current.value;

        try {
            setLoading(true);
            setAlertMsg("");
            const result = await axios.post("/api/login", { email, password });
            result.status === 200 && setLoading(false);

            setUserData(result.data.user);
            localStorage.setItem('arms-user', JSON.stringify(result.data.user));

            setIsUserLoggedIn(true);
            localStorage.setItem('arms-isUserLoggedIn', true);
            setIsUserFaculty(true);
            localStorage.setItem('arms-isFacultyLoggedIn', true);
            navigate("/dashboard");
        } catch (err) {
            setLoading(false);
            console.log(err)
            setAlertMsg("Invalid Credentials! Please try again.");
            toast.error(err.response.data.message || "Something went wrong!");
        }
    }

    return (
        <div className="Login-Main">
            <Header dark />

            <div className="Login-Container flex">
                <div className="Login-Title flex col">
                    <h1>Login as <span>Faculty</span></h1>
                    <img src={PeopleSVG} alt="PeopleSVG" className="LoginVectorA" width={300} height="auto" />
                </div>


                <div className="Login-Form flex col gap">
                    {alertMsg !== "" && <p className="Login-Alert">{alertMsg}</p>}

                    <form className="flex col gap" onSubmit={HandleLogin}>
                        <div className="Login-InputHolder flex col">
                            <label htmlFor="email">Email</label>
                            <div className="Login-Input flex gap05">
                                <input type="text" id="email" placeholder="Enter your email" ref={emailRef} required />
                                <MdAlternateEmail size={25} color="var(--grey)" />
                            </div>
                        </div>

                        <div className="Login-InputHolder flex col">
                            <label htmlFor="password">Password</label>
                            <div className="Login-Input flex gap05">
                                <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" ref={passwordRef} required />
                                <div className="Login-ShowPassToggle flex">
                                    {showPassword ?
                                        <FiEye size={25} color="var(--grey)" onClick={() => setShowPassword(false)} />
                                        : <FiEyeOff size={25} color="var(--grey)" onClick={() => setShowPassword(true)} />
                                    }
                                </div>
                            </div>

                            <div className="Login-ForgotPass flex">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </div>

                        {/* <button className="Login-Submit flex" type="submit">Login</button> */}
                        <LoaderBtn className="Login-Submit flex" type="submit" loading={loading} text="Login" />
                    </form>

                    <div className="Login-toSignup">
                        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                    </div>
                </div>

                <div className="Login-Title2 flex col">
                    <img src={UploadSVG} alt="PeopleSVG" className="LoginVectorA" width={300} height="auto" />
                    <h1>Let's get <span>Started</span></h1>
                </div>
            </div>

            {!isMobile && <Trails angle={90} position="center" />}
        </div>
    )
}

export default Login