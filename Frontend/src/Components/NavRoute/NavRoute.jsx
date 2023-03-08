import "./NavRoute.css"
import { Fragment } from 'react'
import { Link } from "react-router-dom"
import { IoIosArrowForward } from 'react-icons/io'

const NavRoute = ({ routes, defaultRoute = "Dashboard" }) => {
    //Custome made Route Map
    //Default Root Path is "Dashboard", can be changed using @defaultRoute prop 

    //Send an array of object with {path:String} which is also your path to different components
    //and also pass state to specific path
    //// example: [
    //     {path:"Product"},
    //     {path:"Details", state:data},
    //     {path:"Payment", state:data.payment}
    // ] etc.

    //If You have a route within the same parent, include the parent with "/"
    //// example: [
    //     {path:"Institutes"},
    //     {path:"Institutes/New"},
    // ]
    // the path will be "institute/new" & lable is "New"

    return (
        <div className="NavRoute-Main flex">
            <Link to={`/${defaultRoute.toLowerCase()}`}>
                <span>{defaultRoute}</span>
            </Link>

            {routes.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <IoIosArrowForward size={18} color="var(--grey)" />
                        <Link to={`/${item?.path.toLowerCase()}`} state={item?.state}>
                            <span>{item?.path.includes("/") ? item?.path.split("/").pop() : item?.path}</span>
                        </Link>
                    </Fragment>
                )
            }
            )}
        </div>
    )
}

export default NavRoute