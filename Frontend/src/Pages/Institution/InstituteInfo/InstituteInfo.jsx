import "./InstituteInfo.css"
import { useState, useEffect } from 'react'
import { useLocation, Link } from "react-router-dom"
import { useContextData } from "../../../Hooks/useContextData"
import moment from 'moment'
import NavRoute from "../../../Components/NavRoute/NavRoute"
import { BsBuilding } from "react-icons/bs"
import { TbBooks } from "react-icons/tb"
import { FiPlus } from "react-icons/fi"
import { MdSettings } from "react-icons/md"

const InstituteInfo = () => {
    const [collegeInfo, setCollegeInfo] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [subjectCount, setSubjectCount] = useState(0);
    const [docsCount, setDocsCount] = useState(0);
    const [initialRender, setInitialRender] = useState(false)

    const { state, pathname } = useLocation()
    const { instituteStateData, setManageDelete } = useContextData()
    const CollegeData = instituteStateData.length !== 0 ? instituteStateData : state;

    useEffect(() => {
        const CollegePathname = pathname.replaceAll("-", " ").split("/").pop().toLowerCase();
        if (instituteStateData.length !== 0 && CollegePathname === instituteStateData.collegeName.toLowerCase()) {
            setCollegeInfo(instituteStateData)
            setCourseList(instituteStateData?.course)
        } else {
            setCollegeInfo(state)
            setCourseList(state?.course)
        }

        if (!initialRender) {
            //Runs only once on first render
            //else subjectCount, docsCount doubles up :|
            setInitialRender(true)
            CollegeData?.course?.forEach(obj => {
                setSubjectCount(prev => prev + obj?.subjects?.length)

                obj.subjects.forEach(itm => {
                    setDocsCount(prev => prev + itm?.subjectDocs?.length)
                })
            })
        }
    }, [state])

    return (
        <div className="InstituteInfo-Main">
            <NavRoute routes={[{ path: "Institution" }, { path: `institution/${collegeInfo?.collegeName?.replaceAll(" ", "-")}`, state: state }]} />

            <div className="InstituteInfo-Header flex gap">
                <div className="InstituteInfo-Icon flex">
                    <BsBuilding size={70} color="var(--white)" />
                </div>

                <div className="InstituteInfo-Settings flex gap05" onClick={() => setManageDelete({
                    title: "Institute",
                    name: collegeInfo?.collegeName,
                    collegeId: collegeInfo?._id,
                    backPath: `institution`,
                })}>
                    <MdSettings size={25} color="inherit" />
                    <span>Manage</span>
                </div>

                <div className="InstituteInfo-HeadInfo flex col">
                    <div className="InstituteInfo-Title flex col">
                        <h1>{collegeInfo?.collegeName}</h1>
                        <p>{collegeInfo?.description}</p>
                    </div>

                    <div className="InstituteInfo-Chips flex gap">
                        <div className="InstituteInfo-Chip">Courses : {collegeInfo?.course?.length}</div>
                        <div className="InstituteInfo-Chip">Subjects : {subjectCount}</div>
                        <div className="InstituteInfo-Chip">Documents : {docsCount}</div>
                        <div className="InstituteInfo-Chip">Registered On: {moment(collegeInfo?.createdOn).format('LL')}</div>
                        <div className="InstituteInfo-Chip">Registered By: {collegeInfo?.registeredBy}</div>
                    </div>
                </div>
            </div>

            <div className="InstituteInfo-SubHeader flex">
                <h2>Courses</h2>

                <div className="flex gap">
                    <Link to="new" state={collegeInfo} className="InstituteInfo-Create flex gap05">
                        <FiPlus size={25} color="inherit" />
                        <span>New Course</span>
                    </Link>

                    {/* <Link to="upload" state={{ collegeInfo, autoField: false }} className="InstituteInfo-Create flex gap05">
                        <TbFileUpload size={25} color="inherit" />
                        <span>Upload Docs</span>
                    </Link> */}
                </div>
            </div>

            <div className="InstituteInfo-CourseList">
                {courseList.map((obj, index) => {
                    return <Link to={obj?.courseName.replaceAll(" ", "-").toLowerCase()} state={{ data: obj, collegeInfo }} className="InstituteInfo-CourseCard flex col" key={index}>
                        <TbBooks size={50} color="var(--white)" />
                        <h1>{obj?.courseName}</h1>
                        <p>Subjects: {obj?.subjects?.length}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default InstituteInfo