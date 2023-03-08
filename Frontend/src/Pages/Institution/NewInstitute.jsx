import "./NewInstitute.css"
import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { useContextData } from "../../Hooks/useContextData"
import axios from 'axios'
import { toast } from "react-toastify"
import NavRoute from "../../Components/NavRoute/NavRoute"
import LoaderBtn from "../../Components/LoaderBtn/LoaderBtn"

import { BooksSVG } from "../../Assets"
import { MdShortText } from "react-icons/md"
import { FiUser } from "react-icons/fi"
import { BsBuilding } from "react-icons/bs"

const NewInstitute = () => {
    const [loading, setLoading] = useState(false);
    const { userData } = useContextData();
    const navigate = useNavigate();

    const CollegeRef = useRef();
    const DescRef = useRef();
    // console.log(userData)

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const data = {
            collegeName: CollegeRef.current.value,
            description: DescRef.current.value,
            userName: userData.username,
        }

        try {
            const result = await axios.post("/api/createinstitute", data)
            if (result.status == 200) {
                setLoading(false)
                toast.success(result.data.message)
                navigate('/institution')
            }
        } catch (err) {
            setLoading(false)
            toast.error(err.message)
            console.log(err)
        }
    }
    return (
        <div className="NewInstitute-Main">
            <NavRoute routes={[{ path: "Institution" }, { path: "Institution/New" }]} />
            <h1>Create a new <span style={{ color: "var(--primary)" }}>Institute</span></h1>

            <div className="NewInstitute-Container flex">
                <form className="NewInstitute-Form flex col gap" onSubmit={HandleSubmit}>
                    <div className="NewInstitute-InputHolder flex col">
                        <label htmlFor="email">Institute Name</label>
                        <div className="NewInstitute-Input flex gap05">
                            <input type="text" maxLength={30} placeholder="Enter College Name" ref={CollegeRef} required />
                            <BsBuilding size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="NewInstitute-InputHolder flex col">
                        <label htmlFor="email">Description</label>
                        <div className="NewInstitute-Input flex gap05">
                            <textarea rows={3} maxLength={60} placeholder="Enter College description" ref={DescRef} required />
                            <MdShortText size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="NewInstitute-InputHolder flex col">
                        <label htmlFor="email">Institute Creator</label>
                        <div className="NewInstitute-Input flex gap05">
                            <input type="text" style={{ color: "var(--grey)" }} defaultValue={userData.username} disabled required />
                            <FiUser size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <LoaderBtn type="submit" className="NewInstitute-Submit flex" loading={loading} iconType="plus" text="Create" />
                </form>

                <img src={BooksSVG} className="NewInstitute-Vector" alt="BooksSVG" width={400} />
            </div>
        </div>
    )
}

export default NewInstitute