import "./AdminDash.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import CountUp from "react-countup"

import MobileHam from "../MobileHam/MobileHam"
import { FiUserPlus } from "react-icons/fi"
import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { TbBooks } from "react-icons/tb"
import { BsBuilding } from "react-icons/bs"
import { IoBookOutline } from "react-icons/io5"

const AdminDash = () => {
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
        <div className="AdminDash-Main">
            <MobileHam />
            <div className="AdminDash-Header flex">
                <h1>Welcome back, <span style={{ color: "var(--primary)" }}>Admin!</span></h1>
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
                <h2>Admin Control Panel</h2>

                <div className="AdminDash-controlList">
                    <Link to="/institution" className="AdminDash-Control flex gap">
                        <BsBuilding size={25} />
                        <h3>Manage Institutions</h3>
                    </Link>

                    <Link to="/approve" className="AdminDash-Control flex gap">
                        <FiUserPlus size={25} />
                        <h3>Approve Users</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminDash