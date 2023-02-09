import "./NavRoute.css"
import { Fragment } from 'react'
import { NavLink } from "react-router-dom"
import { HiOutlineHome } from 'react-icons/hi'
import { IoIosArrowForward } from 'react-icons/io'

const NavRoute = ({ routes }) => {
    // const NavArray = [
    //     "Bruhh",
    //     "About",
    //     "Contact"
    // ]

    return (
        <div className="NavRoute-Main flex">
            <NavLink to="/dashboard">
                {/* <HiOutlineHome size={17} color="inherit" /> */}
                <span>Dashboard</span>
            </NavLink>

            {routes.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <IoIosArrowForward size={18} color="var(--grey)" />
                        <NavLink to={`/${item}`}>
                            <span>{item}</span>
                        </NavLink>
                    </Fragment>
                )
            }
            )}
        </div>
    )
}

export default NavRoute