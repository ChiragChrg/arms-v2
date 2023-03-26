import "./Header.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useContextData } from "../../Hooks/useContextData"

import ArmsLogo from "../../Assets/ArmsLogo"
import { CgDarkMode, CgClose } from 'react-icons/cg'
import { BsFilterLeft } from 'react-icons/bs'

const Header = ({ dark, altLogo, hideHam = false }) => {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const { setIsDarkTheme, isDarkTheme } = useContextData();
    const deviceWidth = window.innerWidth;
    document.body.style.overflow = showMobileNav ? "hidden" : "auto";

    return (
        <div className="Header-Main">
            <div className="Header-Logo flex" style={{ color: altLogo ? "var(--white)" : "var(--primary)" }}>
                {altLogo ? <ArmsLogo size={35} fill="var(--white)" stroke="var(--primary)" /> : <ArmsLogo size={35} />}
                <p>ARMS</p>
            </div>

            {deviceWidth > 750 ?
                <div className={dark ? "Header-Nav flex gap2 darkTxt" : "Header-Nav flex gap2 lightTxt"}>
                    <Link to="/">Home</Link>
                    <a href="https://devbase.netlify.app/">DevBase</a>
                    <a href="https://github.com/ChiragChrg/">GitHub</a>

                    <div className="Header-ThemeToggle flex" onClick={() => setIsDarkTheme(prev => !prev)} title="Toggle Dark Mode">
                        <CgDarkMode size={25} color="inherit" />
                    </div>
                </div>
                : !hideHam &&
                <div className="Header-Ham flex" onClick={() => setShowMobileNav(prev => !prev)}>
                    <BsFilterLeft size={40} color={altLogo ? "var(--white)" : "var(--primary)"} />
                </div>
            }

            {showMobileNav &&
                <>
                    <div className="Header-MobileNav flex col gap2">
                        <div className="Header-NavClose flex">
                            <CgClose size={30} color="var(--base)" onClick={() => setShowMobileNav(false)} />
                        </div>

                        <Link to="/" onClick={() => setShowMobileNav(false)}>Home</Link>
                        <a href="https://devbase.netlify.app/">DevBase</a>
                        <a href="https://github.com/ChiragChrg/ARMS">GitHub</a>

                        <div className="Header-ThemeToggle flex gap05" onClick={() => setIsDarkTheme(prev => !prev)}>
                            <CgDarkMode size={25} color="inherit" />
                            {isDarkTheme ? "Light" : "Dark"}
                        </div>
                    </div>
                    <div className="Header-Overlay" onClick={() => setShowMobileNav(false)}></div>
                </>
            }
        </div >
    )
}

export default Header