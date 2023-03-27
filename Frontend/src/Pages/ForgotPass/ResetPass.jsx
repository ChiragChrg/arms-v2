import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import * as jose from "jose"
import axios from "axios"
import { toast } from "react-toastify"

import Header from "../../Components/Header/Header"
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn"
import { ResetPassSVG } from "../../Assets"
import { FiArrowLeft } from "react-icons/fi"
import { FiEye, FiEyeOff } from 'react-icons/fi'

const ResetPass = () => {
    const [resetUser, setResetUser] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { resetId } = useParams()
    const navigate = useNavigate()
    const PassRef = useRef()
    const ConfPassRef = useRef()

    useEffect(() => {
        if (resetId === "") {
            toast.error("Invalid Reset URL!")
            navigate("/")
        }

        try {
            const decodedUrl = jose.decodeJwt(resetId, import.meta.env.VITE_JWT_SECRET)
            setResetUser(decodedUrl)
        } catch (err) {
            console.log(err)
            navigate("/")
            toast.error("Invalid Reset URL!")
        }
    }, [resetId])

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const password = PassRef.current.value;
        const confPassword = ConfPassRef.current.value;

        if (password !== confPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const result = await axios.post("/api/reset-password", { userId: resetUser.uid, password });
            if (result.status == 200) {
                setLoading(false);
                toast.success(result?.data?.message);
                navigate("/login");
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    }

    return (
        <div className="ResetPass-Main">
            <div className="ForgotPass-Header flex">
                <Header hideHam />
                <Link to={"/login"} className="ForgotPass-BackBtn flex gap05">
                    <FiArrowLeft size={20} />
                    <span>Back</span>
                </Link>
            </div>

            <div className="ForgotPass-Vector flex col gap2">
                <h1>Reset your <span style={{ color: "var(--primary)" }}>Password</span></h1>
                <img src={ResetPassSVG} alt="ResetPassSVG" width={300} />
            </div>

            <form className="ForgotPass-Form flex col gap" onSubmit={HandleSubmit}>
                <div className="ForgotPass-FormHolder flex col gap">
                    <div className="Signup-InputHolder flex col">
                        <label htmlFor="password">New Password</label>
                        <div className="Signup-Input flex gap05">
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="New Password" ref={PassRef} required />
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
                            <input type={showPassword ? "text" : "password"} id="confpassword" placeholder="Confirm Password" ref={ConfPassRef} required />
                            <div className="Signup-ShowPassToggle flex">
                                {showPassword ?
                                    <FiEye size={25} color="var(--grey)" onClick={() => setShowPassword(false)} />
                                    : <FiEyeOff size={25} color="var(--grey)" onClick={() => setShowPassword(true)} />
                                }
                            </div>
                        </div>
                    </div>

                    <LoaderBtn className="Login-Submit flex" iconType="key" type="submit" loading={loading} text="Reset Password" />
                </div>
            </form>
        </div>
    )
}

export default ResetPass