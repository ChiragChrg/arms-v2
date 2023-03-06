import "./NavRoute.css"
import { Fragment } from 'react'
import { Link } from "react-router-dom"
import { IoIosArrowForward } from 'react-icons/io'

const NavRoute = ({ routes, defaultRoute = "Dashboard", state = {} }) => {
    //Custome made Route Map

    //Default Root Path is "Dashboard", can be changed using @defaultRoute prop 

    //Send an array of String which is also your path to different components
    //// example: ["Product","Details","Payment"] etc.

    //If You have a route within the same parent, include the parent with "/"
    //// example: ["Institutes","Institutes/New"], the path will be "institute/new" & lable is "New"

    return (
        <div className="NavRoute-Main flex">
            <Link to={`/${defaultRoute.toLowerCase()}`}>
                <span>{defaultRoute}</span>
            </Link>

            {routes.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <IoIosArrowForward size={18} color="var(--grey)" />
                        <Link to={`/${item.toLowerCase()}`} state={state}>
                            <span>{item.includes("/") ? item.split("/").pop() : item}</span>
                        </Link>
                    </Fragment>
                )
            }
            )}
        </div>
    )
}

export default NavRoute