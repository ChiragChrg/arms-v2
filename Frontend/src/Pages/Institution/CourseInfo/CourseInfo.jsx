import "./CourseInfo.css"
import { useState, useEffect } from 'react'
import { useLocation, Link } from "react-router-dom"
import { useContextData } from "../../../Hooks/useContextData"

import NavRoute from "../../../Components/NavRoute/NavRoute"
import { TbBooks } from "react-icons/tb"
import { FiPlus } from "react-icons/fi"
import { IoBookOutline } from "react-icons/io5"

const CourseInfo = () => {
    const [courseData, setCourseData] = useState([])
    const [subjectList, setSubjectList] = useState([])
    const [initialRender, setInitialRender] = useState(false)
    const [docsCount, setDocsCount] = useState(0)
    const { state } = useLocation()
    const { courseStateData } = useContextData()

    useEffect(() => {
        if (courseStateData.length !== 0) {
            courseStateData.course.forEach(obj => {
                if (obj._id == state.data._id) {
                    setCourseData(obj)
                    setSubjectList(obj.subjects)
                }
            })
        }
        else {
            setCourseData(state?.data)
            setSubjectList(state?.data?.subjects)
        }
        // console.log("State",state)

        if (!initialRender) {
            setInitialRender(true)

            state?.data?.subjects?.forEach(itm => {
                setDocsCount(prev => prev + itm?.subjectDocs?.length)
            })
        }
    }, [])

    return (
        <div className="CourseInfo-Main">
            <NavRoute
                routes={[
                    { path: "Institution" },
                    { path: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}`, state: state.collegeInfo },
                    { path: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}/${state?.data?.courseName}`, state: state }
                ]}
            />

            <div className="CourseInfo-Header flex gap">
                <div className="CourseInfo-Icon flex">
                    <TbBooks size={60} color="var(--white)" />
                </div>

                <div className="CourseInfo-HeadInfo flex col">
                    <div className="CourseInfo-Title flex col">
                        <h1>{courseData?.courseName?.toUpperCase()}</h1>
                        <h3>{courseData?.courseDesc}</h3>
                    </div>


                    <div className="CourseInfo-Chips flex gap">
                        <h3>{state?.collegeInfo?.collegeName}</h3>
                        <div className="flex gap">
                            <div className="CourseInfo-Chip">Subjects: {courseData?.subjects?.length}</div>
                            <div className="CourseInfo-Chip">Documents: {docsCount}</div>
                            <div className="CourseInfo-Chip">Registered By: {courseData?.courseCreator}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="CourseInfo-SubjectHeader flex">
                <h2>Subjects</h2>

                <Link to="new" state={{ collegeInfo: state?.collegeInfo, data: courseData }} className="InstituteInfo-Create flex gap05">
                    <FiPlus size={25} color="inherit" />
                    <span>New Subject</span>
                </Link>
            </div>

            <div className="InstituteInfo-CourseList">
                {subjectList.map((obj, index) => {
                    return <Link to={obj?.subjectName.replaceAll(" ", "-").toLowerCase()} state={{ data: obj, collegeInfo: state.collegeInfo }} className="InstituteInfo-CourseCard flex col" key={index}>
                        <IoBookOutline size={50} color="var(--white)" />
                        <h1>{obj?.subjectName}</h1>
                        <p>Documents: {obj?.subjectDocs?.length}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default CourseInfo