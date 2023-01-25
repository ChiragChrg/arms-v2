import "./Login.css"
import { useState } from "react"
import { Link } from "react-router-dom"

import Header from "../../Components/Header/Header"
import { MdAlternateEmail } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Trails from "../../Components/Trails/Trails"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const StripCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className="Login-Main">
            <Header dark />

            <div className="Login-Title flex">
                <h1>Login as <span>Faculty</span></h1>
            </div>

            <div className="Login-Form flex col gap2">
                <form className="flex col gap">
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

            <Trails angle={90} center />
        </div>
    )
}

export default Login