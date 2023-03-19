// import "./SubjectInfo.css" // Styles from InstituteInfo.css
import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { useContextData } from "../../../Hooks/useContextData"
import { partial } from "filesize";
import { toast } from "react-toastify"
import moment from 'moment'
import axios from 'axios'

import NavRoute from "../../../Components/NavRoute/NavRoute"
import { IoBookOutline } from "react-icons/io5"
import { FiLoader, FiPlus } from "react-icons/fi"
import { MdSettings } from "react-icons/md"

const SubjectInfo = () => {
    const [subjectData, setSubjectData] = useState([])
    const [docsList, setDocsList] = useState([])
    const [loading, setLoading] = useState(false)
    const { state, pathname } = useLocation()
    const { isAdmin, docsStateData, setDocsStateData, setCourseStateData, setManageDelete, setInstituteStateData } = useContextData()
    const size = partial({ base: 10 })

    useEffect(() => {
        const SubjectPathname = pathname.replaceAll("-", " ").split("/").pop().toLowerCase();

        if (docsStateData.length !== 0 && SubjectPathname === docsStateData[0]?.subjectName.toLowerCase()) {
            setSubjectData(docsStateData[0])
            setDocsList(docsStateData[0]?.subjectDocs)
        } else {
            setSubjectData(state?.data)
            setDocsList(state?.data?.subjectDocs)
        }
    }, [state, pathname, docsStateData])

    const HandleDocDelete = async (fileId, index) => {
        setLoading(index)
        try {
            const data = {
                fileId: fileId,
                collegeId: state?.collegeInfo?._id,
                courseId: state?.courseInfo?._id,
                subjectId: state?.data?._id
            }
            const res = await axios.post('/api/deletedoc', data)
            // console.log(res)
            if (res.status == 200) {
                setLoading(false)

                res.data?.deletedDocs?.course.forEach(obj => {
                    let mainObj = res.data?.deletedDocs;

                    //Sending updated data back to Context State to parent dir
                    if (obj._id == data.courseId) {
                        obj.subjects.forEach(sub => {
                            if (sub._id == data.subjectId) {
                                let tempSub = sub.subjectDocs.filter(i => i.docId !== fileId)
                                let newSub = [{ ...sub, subjectDocs: tempSub }]
                                setDocsStateData(newSub)

                                let cIndex = mainObj.course.findIndex(ele => ele._id == data.courseId)
                                let sIndex = obj.subjects.findIndex(ele => ele._id == data.subjectId)
                                let cSub = obj.subjects;

                                cSub[sIndex] = { ...newSub[0] }
                                mainObj.course[cIndex] = { ...mainObj.course[cIndex], subjects: cSub }
                                setCourseStateData(mainObj)
                                setInstituteStateData(mainObj)
                            }
                        })
                    }
                })

                toast.success(res.data.message)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
            toast.error(err.message)
        }
    }

    return (
        <div className="SubjectInfo-Main">
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

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

                <div className="InstituteInfo-Settings flex gap05" onClick={() => setManageDelete({
                    title: "Subject",
                    name: subjectData?.subjectName,
                    collegeId: state?.collegeInfo?._id,
                    courseId: state?.courseInfo?._id,
                    subjectId: state?.data?._id,
                    backPath: `institution/${state?.collegeInfo?.collegeName.replaceAll(" ", "-")}/${state?.courseInfo?.courseName.replaceAll(" ", "-")}`,
                    backState: state,
                })}>
                    <MdSettings size={25} color="inherit" />
                    <span>Manage</span>
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

                <Link to="upload" state={state} className="InstituteInfo-Create flex gap05">
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
                            {isAdmin && <th>Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {docsList.map((obj, index) => {
                            let fileId = obj?.docId;
                            return (<tr key={index} className="SubjectInfo-TableRow">
                                <td>{obj?.docName}</td>
                                <td>{size(obj?.docSize)}</td>
                                <td>{obj?.docUploader}</td>
                                <td>{moment(obj?.docCreated).format('LL')}</td>
                                <td><a href={obj?.docLink}>Download</a></td>
                                {isAdmin &&
                                    <td style={{ color: "var(--red)", fontWeight: "bold", cursor: "pointer" }}
                                        onClick={() => HandleDocDelete(fileId, index)}>
                                        {loading === index ?
                                            <FiLoader size={25} color="inherit" style={{ animation: "spin 2s linear infinite" }} />
                                            : "Delete"}
                                    </td>}
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SubjectInfo