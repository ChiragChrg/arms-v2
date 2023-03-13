// import "./SubjectInfo.css" // Styles from InstituteInfo.css
import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { partial } from "filesize";
import moment from 'moment'

import NavRoute from "../../../Components/NavRoute/NavRoute"
import { IoBookOutline } from "react-icons/io5"
import { FiPlus } from "react-icons/fi"
import { HiOutlineDocumentDuplicate } from "react-icons/hi"

const SubjectInfo = () => {
    const [subjectData, setSubjectData] = useState([])
    const [docsList, setDocsList] = useState([])
    const { state } = useLocation()
    const size = partial({ base: 10 })

    useEffect(() => {
        setSubjectData(state?.data)
        setDocsList(state?.data?.subjectDocs)
        console.log(state)
    }, [])

    return (
        <div className="SubjectInfo-Main">
            <NavRoute routes={[
                { path: "Institution" },
                { path: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}`, state: state.collegeInfo },
                { path: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}/${state?.courseInfo?.courseName.replaceAll(" ", "-")}`, state: { data: state.courseInfo, collegeInfo: state.collegeInfo } },
                { path: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}/${state?.courseInfo?.courseName.replaceAll(" ", "-")}/${state?.data?.subjectName.replaceAll(" ", "-")}`, state: state }
            ]} />

            <div className="InstituteInfo-Header flex gap">
                <div className="InstituteInfo-Icon flex">
                    <IoBookOutline size={60} color="var(--white)" />
                </div>

                <div className="InstituteInfo-HeadInfo flex col">
                    <div className="InstituteInfo-Title flex col">
                        <h1>{subjectData?.subjectName?.toUpperCase()}</h1>
                        <h3>{subjectData?.subjectDesc}</h3>
                    </div>


                    <div className="InstituteInfo-Chips flex gap">
                        <h3>{state?.collegeInfo?.collegeName}</h3>
                        <div className="flex gap">
                            <div className="InstituteInfo-Chip">Documents: {subjectData?.subjectDocs?.length}</div>
                            <div className="InstituteInfo-Chip">Registered By: {subjectData?.subjectCreator}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="InstituteInfo-SubHeader flex">
                <h2>Documents</h2>

                <Link to="new" className="InstituteInfo-Create flex gap05">
                    <FiPlus size={25} color="inherit" />
                    <span>Upload Docs</span>
                </Link>
            </div>

            <div className="SubjectInfo-TableContainer">
                <table border="0" className="SubjectInfo-Table">
                    <thead>
                        <tr>
                            <th>Filename</th>
                            <th>Size</th>
                            <th>Uploader</th>
                            <th>Created</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docsList.map((obj, index) => {
                            return (<tr className="SubjectInfo-TableRow">
                                <td>{obj?.docName}</td>
                                <td>{size(obj?.docSize)}</td>
                                <td>{obj?.docUploader}</td>
                                <td>{moment(obj?.docCreated).format('LL')}</td>
                                <td><a href={obj?.docLink}>Download</a></td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SubjectInfo