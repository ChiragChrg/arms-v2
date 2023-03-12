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
import { MdShortText } from "react-icons/md"

const NewCourse = () => {
    const [loading, setLoading] = useState(false);
    const { userData, setInstituteStateData } = useContextData()

    const navigate = useNavigate();
    const { state } = useLocation();
    const CourseRef = useRef();
    const CourseDescRef = useRef();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const data = {
            collegeId: state._id,
            courseName: CourseRef.current.value,
            courseDesc: CourseDescRef.current.value,
            courseCreator: userData.username,
        }

        try {
            const res = await axios.post('/api/createcourse', data)
            // console.log(res)

            if (res.status == 201) {
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
            <NavRoute
                routes={[
                    { path: "Institution" },
                    { path: `institution/${state?.collegeName?.replaceAll(" ", "-")}`, state: state },
                    { path: `institution/${state?.collegeName?.replaceAll(" ", "-")}/New`, state: state }
                ]}
            />

            <h1>Create new <span style={{ color: "var(--primary)" }}>Course</span></h1>

            <div className="NewCourse-Container flex">
                <form className="NewCourse-Form flex col gap" onSubmit={HandleSubmit}>
                    <div className="NewCourse-InputHolder flex col">
                        <label htmlFor="email">Course Name</label>
                        <div className="NewCourse-Input flex gap05">
                            <input type="text" maxLength={30} placeholder="Enter Course short name" ref={CourseRef} required />
                            <TbBooks size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="NewInstitute-InputHolder flex col">
                        <label htmlFor="email">Course Description</label>
                        <div className="NewInstitute-Input flex gap05">
                            <textarea rows={3} maxLength={60} placeholder="Enter Course fullname / description" ref={CourseDescRef} required />
                            <MdShortText size={25} color="var(--grey)" />
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