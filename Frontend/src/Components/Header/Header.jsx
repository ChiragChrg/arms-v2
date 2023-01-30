import "./Header.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useContextData } from "../../Hooks/useContextData"
import { CgDarkMode, CgClose } from 'react-icons/cg'
import { BsFilterLeft } from 'react-icons/bs'

const Header = ({ dark, altLogo }) => {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const { setIsDarkTheme } = useContextData();
    const deviceWidth = window.innerWidth;
    document.body.style.overflow = showMobileNav ? "hidden" : "auto";

    return (
        <div className="Header-Main">
            <div className="Header-Logo" style={{ color: altLogo ? "var(--white)" : "var(--primary)" }}>
                ARMS
            </div>

            {deviceWidth > 750 ?
                <div className={dark ? "Header-Nav flex gap2 darkTxt" : "Header-Nav flex gap2 lightTxt"}>
                    <Link to="/">Home</Link>
                    <a href="https://devbase.netlify.app/">DevBase</a>
                    <a href="https://github.com/ChiragChrg/">GitHub</a>

                    <div className="Header-ThemeToggle flex" onClick={() => setIsDarkTheme(prev => !prev)}>
                        <CgDarkMode size={25} color="inherit" />
                    </div>
                </div>
                :
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

                        <div className="Header-ThemeToggle flex" onClick={() => setIsDarkTheme(prev => !prev)}>
                            <CgDarkMode size={25} color="inherit" />
                        </div>
                    </div>
                    <div className="Header-Overlay" onClick={() => setShowMobileNav(false)}></div>
                </>
            }
        </div >
    )
}

export default Header