import "./ForgotPass.css"
import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import emailjs from '@emailjs/browser';
import * as jose from 'jose'

import Header from "../../Components/Header/Header"
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn"
import { ForgotPassSVG } from "../../Assets"
import { MdAlternateEmail } from "react-icons/md"
import { FiArrowLeft } from "react-icons/fi"

const ForgotPass = () => {
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()

    const HandleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axios.post('/api/forgot-password', { email: emailRef.current.value.toLowerCase() })
            if (res.status == 200) {
                //Sending Mail to User
                let templateParams = {
                    to_name: res.data.reset.username,
                    to_email: res.data.reset.email,
                    reset_link: res.data.reset.resetLink
                }
                const mailRes = await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_PASSWORD_TEMPLATE_ID,
                    templateParams,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    return (
        <div className="ForgotPass-Main">
            <div className="ForgotPass-Header flex">
                <Header hideHam />
                <Link to={"/login"} className="ForgotPass-BackBtn flex gap05">
                    <FiArrowLeft size={20} />
                    <span>Back</span>
                </Link>
            </div>

            <div className="ForgotPass-Vector flex col gap2">
                <h1>Forgot <span style={{ color: "var(--primary)" }}>Password ?</span></h1>
                <img src={ForgotPassSVG} alt="ForgotPassSVG" width={300} />
            </div>

            <form className="ForgotPass-Form flex col gap" onSubmit={HandleSubmit}>
                <div className="ForgotPass-FormHolder flex col gap">
                    <div className="Login-InputHolder">
                        <label htmlFor="email">Email</label>
                        <div className="Login-Input flex gap05">
                            <input type="text" id="email" placeholder="Enter your email" ref={emailRef} required />
                            <MdAlternateEmail size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <LoaderBtn className="Login-Submit flex" iconType="key" type="submit" loading={loading} text="Reset Password" />
                </div>
            </form>
        </div >
    )
}

export default ForgotPass