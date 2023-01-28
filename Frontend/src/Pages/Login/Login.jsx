import "./Login.css"
import { useState } from "react"
import { Link } from "react-router-dom"

import Header from "../../Components/Header/Header"
import Trails from "../../Components/Trails/Trails"
import { MdAlternateEmail } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    let isMobile = window.innerWidth <= 750;

    const HandleLogin = () => {
        setIsUserLoggedIn(true);
        setIsUserFaculty(true);
        localStorage.setItem('arms-isUserLoggedIn', true);
        localStorage.setItem('arms-isFacultyLoggedIn', true);
        navigate('/dashboard');
    }

    return (
        <div className="Login-Main">
            <Header dark />

            <div className="Login-Title flex">
                <h1>Login as <span>Faculty</span></h1>
            </div>

            <div className="Login-Form flex col gap2">
                <form className="flex col gap" onSubmit={HandleLogin}>
                    <div className="Login-InputHolder flex col">
                        <label htmlFor="email">Email</label>
                        <div className="Login-Input flex gap05">
                            <input type="text" id="email" placeholder="Enter your email" />
                            <MdAlternateEmail size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="Login-InputHolder flex col">
                        <label htmlFor="password">Password</label>
                        <div className="Login-Input flex gap05">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" />
                            <div className="Login-ShowPassToggle flex">
                                {showPassword ?
                                    <FiEyeOff size={25} color="var(--grey)" onClick={() => setShowPassword(false)} />
                                    : <FiEye size={25} color="var(--grey)" onClick={() => setShowPassword(true)} />
                                }
                            </div>
                        </div>

                        <div className="Login-ForgotPass flex">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </div>

                    <button className="Login-Submit flex" type="submit">Login</button>
                </form>

                <div className="Login-toSignup">
                    <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                </div>
            </div>

            <div className="Login-Title2 flex">
                <h1>Let's get <span>Started</span></h1>
            </div>

            {!isMobile && <Trails angle={90} position="center" />}
        </div>
    )
}

export default Login