import "./NewCourse.css"
import { useState, useRef } from "react";
import axios from 'axios'
import { useContextData } from "../../../Hooks/useContextData";
import { useNavigate, useLocation } from "react-router-dom"
import NavRoute from "../../../Components/NavRoute/NavRoute";
import LoaderBtn from "../../../Components/LoaderBtn/LoaderBtn";
import { toast } from 'react-toastify'
import { CourseSVG } from "../../../Assets";
import { TbBooks } from "react-icons/tb"
import { FiUser } from "react-icons/fi"

const NewCourse = () => {
    const [loading, setLoading] = useState(false);
    const { userData, setInstituteStateData } = useContextData()

    const navigate = useNavigate();
    const { state } = useLocation();
    const CourseRef = useRef();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const data = {
            collegeId: state._id,
            courseName: CourseRef.current.value,
            courseCreator: userData.username,
        }

        try {
            const res = await axios.post('/api/createcourse', data)
            // console.log(res)

            if (res.status == 200) {
                setLoading(false)
                toast.success(res.data.message)
                //setInstituteStateData sends state back to InstituteInfo to update courses list
                setInstituteStateData(res.data.savedCourse)
                navigate(-1)
            }
        } catch (err) {
            setLoading(false)
            toast.error(err.message)
            console.log(err)
        }
    }
    return (
        <div className="NewCourse-Main">
            <NavRoute state={state} routes={["Institution", `institution/${state?.collegeName?.replaceAll(" ", "-")}`, `institution/${state?.collegeName?.replaceAll(" ", "-")}/New`]} />

            <h1>Create new <span style={{ color: "var(--primary)" }}>Course</span></h1>

            <div className="NewCourse-Container flex">
                <form className="NewCourse-Form flex col gap" onSubmit={HandleSubmit}>
                    <div className="NewCourse-InputHolder flex col">
                        <label htmlFor="email">Course Name</label>
                        <div className="NewCourse-Input flex gap05">
                            <input type="text" maxLength={30} placeholder="Enter Course Name" ref={CourseRef} required />
                            <TbBooks size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="NewCourse-InputHolder flex col">
                        <label htmlFor="email">Course Creator</label>
                        <div className="NewCourse-Input flex gap05">
                            <input type="text" style={{ color: "var(--grey)" }} defaultValue={userData.username} disabled required />
                            <FiUser size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <LoaderBtn type="submit" loading={loading} className="NewCourse-Submit" iconType="plus" text="Create" />
                </form>

                <img src={CourseSVG} className="NewInstitute-Vector" alt="BooksSVG" width={400} />
            </div>
        </div>
    )
}

export default NewCourse