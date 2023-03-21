import "./Dashboard.css"
// import "../../Components/AdminDash/AdminDash.css"
import { useState, useEffect } from "react";
import { useContextData } from "../../Hooks/useContextData"
import { Link } from "react-router-dom"
import axios from 'axios'
import CountUp from "react-countup"

import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { TbBooks } from "react-icons/tb"
import { BsBuilding } from "react-icons/bs"
import { IoBookOutline } from "react-icons/io5"

import MobileHam from "../../Components/MobileHam/MobileHam"

const Dashboard = () => {
    const { isReturningUser, userData } = useContextData();
    const [count, setCount] = useState({})

    useEffect(() => {
        const GetCount = async () => {
            try {
                const res = await axios.get('/api/getcountup')
                if (res.status === 200) {
                    setCount(res.data.Count)
                }
            } catch (err) {
                console.log(err)
            }
        }
        GetCount()
    }, [])

    return (
        <div className="Dashboard-Main">
            <MobileHam />

            <div className="AdminDash-Header flex">
                {isReturningUser ?
                    <h1>Welcome back, <span style={{ color: "var(--primary)" }}>{userData?.username ? userData.username : "User"}</span></h1>
                    :
                    <h1>Welcome to ARMS</h1>
                }
            </div>

            <div className="AdminDash-Cards">
                <div className="AdminDash-Card flex col">
                    <div className="flex gap05">
                        <BsBuilding size={25} />
                        <h2>Institutes</h2>
                    </div>
                    <div className="flex gap05">
                        <h3><CountUp end={count.institute} duration={2} /></h3>
                        <p>Institutes registered</p>
                    </div>
                </div>

                <div className="AdminDash-Card flex col">
                    <div className="flex gap05">
                        <TbBooks size={25} />
                        <h2>Courses</h2>
                    </div>
                    <div className="flex gap05">
                        <h3><CountUp end={count.course} duration={2} /></h3>
                        <p>Courses created</p>
                    </div>
                </div>

                <div className="AdminDash-Card flex col">
                    <div className="flex gap05">
                        <IoBookOutline size={25} />
                        <h2>Subjects</h2>
                    </div>
                    <div className="flex gap05">
                        <h3><CountUp end={count.subject} duration={2} /></h3>
                        <p>Subjects created</p>
                    </div>
                </div>

                <div className="AdminDash-Card flex col">
                    <div className="flex gap05">
                        <HiOutlineDocumentDuplicate size={25} />
                        <h2>Documents</h2>
                    </div>
                    <div className="flex gap05">
                        <h3><CountUp end={count.document} duration={2} /></h3>
                        <p>PDFs uploaded</p>
                    </div>
                </div>
            </div>

            <div className="AdminDash-controller flex col gap">
                <h2>User Actions</h2>

                <div className="AdminDash-controlList">
                    <Link to="/institution" className="AdminDash-Control flex gap">
                        <BsBuilding size={25} />
                        <h3>Institutions</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard