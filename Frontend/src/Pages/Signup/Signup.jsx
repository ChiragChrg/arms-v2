import "./Signup.css"
import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

import Header from "../../Components/Header/Header"
import Trails from "../../Components/Trails/Trails"
import { FaRegUser } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
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
            return;
        }

        try {
            const result = await axios.post("/api/signup", { username, email, password });
            toast.success(result.data.message);
            navigate("/login");
        } catch (err) {
            toast.error(err.response.data.message || "Something went wrong!");
        }
    }

    return (
        <div className="Signup-Main">
            <Header dark altLogo={isMobile ? false : true} />

            <div className="Signup-Title flex">
                <h1>Welcome new <span>Faculty</span></h1>

                <div className="Signup-toLogin">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>


            <div className="Signup-Form flex">
                <form className="flex col gap" onSubmit={HandleSubmit}>
                    <div className="Signup-InputHolder flex col">
                        <label htmlFor="username">Username</label>
                        <div className="Signup-Input flex gap05">
                            <input type="text" id="username" placeholder="Username" ref={usernameRef} />
                            <FaRegUser size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="Signup-InputHolder flex col">
                        <label htmlFor="email">Email</label>
                        <div className="Signup-Input flex gap05">
                            <input type="text" id="email" placeholder="Enter your email" ref={emailRef} />
                            <MdAlternateEmail size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="Signup-InputHolder flex col">
                        <label htmlFor="password">Password</label>
                        <div className="Signup-Input flex gap05">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" ref={passwordRef} />
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
                            <input type={showPassword ? "text" : "password"} id="confpassword" placeholder="Password" ref={confPasswordRef} />
                            <div className="Signup-ShowPassToggle flex">
                                {showPassword ?
                                    <FiEye size={25} color="var(--grey)" onClick={() => setShowPassword(false)} />
                                    : <FiEyeOff size={25} color="var(--grey)" onClick={() => setShowPassword(true)} />
                                }
                            </div>
                        </div>
                    </div>

                    <button className="Signup-Submit flex" type="submit">Signup</button>
                </form>
            </div>

            {!isMobile && <Trails angle={45} position="left" top="5em" />}
        </div>
    )
}

export default Signup