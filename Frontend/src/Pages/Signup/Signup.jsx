import "./Signup.css"
import { useState } from "react"
import { Link } from "react-router-dom"

import Header from "../../Components/Header/Header"
import Trails from "../../Components/Trails/Trails"
import { FaRegUser } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    let isMobile = window.innerWidth <= 750;

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
                <form className="flex col gap">
                    <div className="Signup-InputHolder flex col">
                        <label htmlFor="username">Username</label>
                        <div className="Signup-Input flex gap05">
                            <input type="text" id="username" placeholder="Username" />
                            <FaRegUser size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="Signup-InputHolder flex col">
                        <label htmlFor="email">Email</label>
                        <div className="Signup-Input flex gap05">
                            <input type="text" id="email" placeholder="Enter your email" />
                            <MdAlternateEmail size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="Signup-InputHolder flex col">
                        <label htmlFor="password">Password</label>
                        <div className="Signup-Input flex gap05">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="Password" />
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
                            <input type={showPassword ? "text" : "password"} id="confpassword" placeholder="Password" />
                            <div className="Signup-ShowPassToggle flex">
                                {showPassword ?
                                    <FiEye size={25} color="var(--grey)" onClick={() => setShowPassword(false)} />
                                    : <FiEyeOff size={25} color="var(--grey)" onClick={() => setShowPassword(true)} />
                                }
                            </div>
                        </div>
                    </div>

                    <button className="Signup-Submit flex" type="submit">Login</button>
                </form>
            </div>

            {!isMobile && <Trails angle={45} position="left" />}
        </div>
    )
}

export default Signup