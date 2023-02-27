import "./AdminDash.css"
import { Link } from "react-router-dom"
import axios from 'axios'
import CountUp from "react-countup"
import { FiUsers, FiPlus } from "react-icons/fi"
import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { TbBooks, TbFileUpload } from "react-icons/tb"
import { BsBuilding } from "react-icons/bs"

const AdminDash = () => {
    return (
        <div className="AdminDash-Main">
            <h1>Welcome back, Admin!</h1>

            <div className="AdminDash-Cards flex gap2">
                <div className="AdminDash-Card flex col">
                    <div className="flex gap05">
                        <FiUsers size={25} />
                        <h2>Faculty</h2>
                    </div>
                    <div className="flex gap05">
                        <h3><CountUp end={24} duration={2} /></h3>
                        <p>Users signed up</p>
                    </div>
                </div>

                <div className="AdminDash-Card flex col">
                    <div className="flex gap05">
                        <BsBuilding size={25} />
                        <h2>Institutes</h2>
                    </div>
                    <div className="flex gap05">
                        <h3><CountUp end={5} duration={2} /></h3>
                        <p>Institutes registered</p>
                    </div>
                </div>

                <div className="AdminDash-Card flex col">
                    <div className="flex gap05">
                        <TbBooks size={25} />
                        <h2>Courses</h2>
                    </div>
                    <div className="flex gap05">
                        <h3><CountUp end={31} duration={2} /></h3>
                        <p>Courses in total</p>
                    </div>
                </div>

                <div className="AdminDash-Card flex col">
                    <div className="flex gap05">
                        <HiOutlineDocumentDuplicate size={25} />
                        <h2>Documents</h2>
                    </div>
                    <div className="flex gap05">
                        <h3><CountUp end={78} duration={2} /></h3>
                        <p>PDFs uploaded</p>
                    </div>
                </div>
            </div>

            <div className="AdminDash-Controler flex col gap">
                <h2>Admin Control Panel</h2>
                <Link to="/upload" className="AdminDash-Control Upload flex gap05">
                    <TbFileUpload size={25} />
                    <h3>Upload Documents</h3>
                </Link>

                <div className="flex gap">
                    <div className="AdminDash-Control flex gap05">
                        <FiPlus size={25} />
                        <h3>Approve Faculty</h3>
                    </div>

                    <div className="AdminDash-Control flex gap05">
                        <FiPlus size={25} />
                        <h3>Upload Documents</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDash