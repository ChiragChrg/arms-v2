// import "./NewSubject.css" // Styles from NewInstitute.css
import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useContextData } from "../../../Hooks/useContextData"
import axios from "axios"
import { toast } from 'react-toastify'

import NavRoute from "../../../Components/NavRoute/NavRoute"
import LoaderBtn from "../../../Components/LoaderBtn/LoaderBtn"
import { SubjectSVG } from "../../../Assets"
import { FiUser } from "react-icons/fi"
import { IoBookOutline } from "react-icons/io5"
import { MdShortText } from "react-icons/md"

const NewSubject = () => {
    const [loading, setLoading] = useState(false)
    const { userData, setCourseStateData, setInstituteStateData } = useContextData()

    const navigate = useNavigate()
    const { state } = useLocation()
    const SubjectRef = useRef()
    const SubjectDesc = useRef()

    useEffect(() => {
        console.log(state)
    }, [])

    const HandleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            collegeId: state?.collegeInfo?._id,
            courseId: state?.data?._id,
            subjectName: SubjectRef.current.value,
            subjectDesc: SubjectDesc.current.value,
            subjectCreator: userData.username
        }

        try {
            const res = await axios.post('/api/createsubject', data)
            console.log("RES", res)

            if (res.status === 201) {
                setCourseStateData(res.data.savedSubject)
                setInstituteStateData(res.data.savedSubject)
                toast.success(res.data.message)
                setLoading(false)
                navigate(-1)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || err.message)
            setLoading(false)
        }
    }

    return (
        <div className="NewSubject-Main">
            <NavRoute routes={[
                { path: "Institution" },
                { path: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}`, state: state?.collegeInfo },
                { path: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}/${state?.data?.courseName}`, state: state },
                { path: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}/${state?.data?.courseName}/New`, state: state },
            ]} />

            <h1>Create new <span style={{ color: "var(--primary)" }}>Subject</span></h1>

            <div className="NewInstitute-Container flex">
                <form className="NewInstitute-Form flex col gap" onSubmit={HandleSubmit}>
                    <div className="NewInstitute-InputHolder flex col">
                        <label htmlFor="email">Subject Name</label>
                        <div className="NewInstitute-Input flex gap05">
                            <input type="text" maxLength={30} placeholder="Enter Subject short name" ref={SubjectRef} required />
                            <IoBookOutline size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="NewInstitute-InputHolder flex col">
                        <label htmlFor="email">Subject Description</label>
                        <div className="NewInstitute-Input flex gap05">
                            <textarea rows={3} maxLength={60} placeholder="Enter Subject fullname / description" ref={SubjectDesc} required />
                            <MdShortText size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="NewInstitute-InputHolder flex col">
                        <label htmlFor="email">Subject Creator</label>
                        <div className="NewInstitute-Input flex gap05">
                            <input type="text" style={{ color: "var(--grey)" }} defaultValue={userData.username} disabled required />
                            <FiUser size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <LoaderBtn type="submit" loading={loading} text="Create" iconType="plus" className="NewInstitute-Submit" />
                </form>

                <img src={SubjectSVG} className="NewInstitute-Vector" alt="BooksSVG" width={400} />
            </div>
        </div>
    )
}

export default NewSubject