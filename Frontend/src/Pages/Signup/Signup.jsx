import "./Signup.css"
import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

import Header from "../../Components/Header/Header"
import Trails from "../../Components/Trails/Trails"
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn"

import { FaRegUser } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { GroupSVG } from "../../Assets"

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const navigate = useNavigate();
    let isMobile = window.innerWidth <= 750;

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confPasswordRef = useRef();

    const HandleSubmit = async (e) => {
        e.preventDefault();

        const username = usernameRef.current.value.charAt(0).toUpperCase() + usernameRef.current.value.slice(1);
        const email = emailRef.current.value.toLowerCase();
        const password = passwordRef.current.value;
        const confPassword = confPasswordRef.current.value;

        if (password !== confPassword) {
            toast.error("Passwords do not match!");
            setAlertMsg("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            setAlertMsg("");
            const result = await axios.post("/api/signup", { username, email, password });
            result.status === 200 && setLoading(false);

            toast.success(result.data.message);
            navigate("/login");
        } catch (err) {
            setLoading(false);
            setAlertMsg(err.response.data.message || "Something went wrong!");
            toast.error(err.response.data.message || "Something went wrong!");
        }
    }

    return (
        <div className="Signup-Main">
            <Header dark altLogo={isMobile ? false : true} />

            <div className="Signup-Container flex">
                <div className="Signup-Form flex col gap05">
                    {alertMsg !== "" && <p className="Signup-Alert">{alertMsg}</p>}

                    <form className="flex col gap" onSubmit={HandleSubmit}>
                        <div className="Signup-InputHolder flex col">
                            <label htmlFor="username">Username</label>
                            <div className="Signup-Input flex gap05">
                                <input type="text" id="username" placeholder="Username" ref={usernameRef} required />
                                <FaRegUser size={25} color="var(--grey)" />
                            </div>
                        </div>

                        <div className="Signup-InputHolder flex col">
                            <label htmlFor="email">Email</label>
                            <div className="Signup-Input flex gap05">
                                <input type="text" id="email" placeholder="Enter your email" ref={emailRef} required />
                                <MdAlternateEmail size={25} color="var(--grey)" />
                            </div>
                        </div>

                        <div className="Signup-InputHolder flex col">
                            <label htmlFor="password">Password</label>
                            <div className="Signup-Input flex gap05">
                                <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" ref={passwordRef} required />
                                <div className="Signup-ShowPassToggle flex">
                                    {showPassword ?
                                        <FiEye size={25} color="var(--grey)" onClick={() => setShowPassword(false)} />
                                        : <FiEyeOff size={25} color="var(--grey)" onClick={() => setShowPassword(true)} />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="Signup-InputHolder flex col">
                            <label htmlFor="confpassword">Confirm Password</label>
                            <div className="Signup-Input flex gap05">
                                <input type={showPassword ? "text" : "password"} id="confpassword" placeholder="Password" ref={confPasswordRef} required />
                                <div className="Signup-ShowPassToggle flex">
                                    {showPassword ?
                                        <FiEye size={25} color="var(--grey)" onClick={() => setShowPassword(false)} />
                                        : <FiEyeOff size={25} color="var(--grey)" onClick={() => setShowPassword(true)} />
                                    }
                                </div>
                            </div>
                        </div>

                        {/* <button className="Signup-Submit flex" type="submit">Signup</button> */}
                        <LoaderBtn className="Login-Submit flex" type="submit" loading={loading} text="Signup" />
                    </form>

                    <div className="Signup-toLoginMob">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>

                <div className="Signup-Title flex col gap">
                    <h1>Welcome new <span>Faculty</span></h1>

                    <img src={GroupSVG} alt="GroupSVG" className="Signup-Vector" width={400} height="auto" />

                    <div className="Signup-toLogin">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>

            {!isMobile && <Trails angle={45} position="left" top="5em" />}
        </div>
    )
}

export default Signup