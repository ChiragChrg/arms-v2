import "./Header.css"
import { Link } from "react-router-dom"
import { CgDarkMode } from 'react-icons/cg'
import { useContextData } from "../../Hooks/useContextData"

const Header = () => {
    const { setIsDarkTheme } = useContextData();

    return (
        <div className="Header-Main">
            <div className="Header-Logo">
                ARMS
            </div>

            <div className="Header-Nav flex gap2">
                <Link to="/">Home</Link>
                <a href="https://devbase.netlify.app/">DevBase</a>
                <a href="https://github.com/ChiragChrg/ARMS">GitHub</a>

                <div className="Header-ThemeToggle flex" onClick={() => setIsDarkTheme(prev => !prev)}>
                    <CgDarkMode size={25} color="var(--white)" />
                </div>
            </div>
        </div>
    )
}

export default Header