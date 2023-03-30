import "./About.css"
import { Link } from "react-router-dom"
import MobileHam from "../../Components/MobileHam/MobileHam"
import ArmsLogo from "../../Assets/ArmsLogo"
import { DevbaseLogo, Google } from "../../Assets"
import { BsGithub } from "react-icons/bs"
import { RiCustomerService2Fill } from "react-icons/ri"

const About = () => {

    return (
        <div className="About-Main">
            <MobileHam />
            <h1>About</h1>

            <div className="About-Title flex col gap">
                <div className="About-Logo flex">
                    <div className="pulse"></div>
                    <div className="pulse"></div>
                    <ArmsLogo size="10em" />
                </div>

                <h2><span>A</span>cademic <span>R</span>esource <span>M</span>anagement <span>S</span>ystem</h2>
            </div>

            <div className="About-Info">
                <span>ARMS</span>, Academic Resource Management System is an open-source website that provides a platform for teachers to upload study materials such as PDFs. The system is designed to make it easy for teachers to share their educational resources with their students and also with the wider community. The website is available to the public, which means that any student can download the uploaded files and use them for their studies. ARMS is a powerful tool that enables teachers to manage and share their academic resources, providing a valuable service to students and educators alike. By using ARMS, teachers can reach a wider audience, improve their teaching materials, and contribute to the education community as a whole.
            </div>

            <div className="About-Links flex">
                <a href="https://devbase.netlify.app/" id="devbase" target="_blank" title="Devbase">
                    <img src={DevbaseLogo} alt="DevBase" />
                </a>


                <a href="https://github.com/ChiragChrg" id="github" target="_blank" title="GitHub">
                    <BsGithub color="var(--white)" />
                </a>

                <a href="https://www.google.com/search?q=%22chiragchrg%22" id="google" target="_blank" title="Google">
                    <img src={Google} alt="Google" />
                </a>

                <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=chiruchirag2001@gmail.com" id="contact" target="_blank" title="Contact Me">
                    <RiCustomerService2Fill color="var(--primary)" />
                </a>
            </div>
        </div>
    )
}

export default About