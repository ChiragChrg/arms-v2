import "./FileUpload.css"
import { useState, useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom"
import { useContextData } from "../../Hooks/useContextData"
import axios from "axios"
import { partial } from "filesize";
import NavRoute from "../NavRoute/NavRoute"

import { BsBuilding } from "react-icons/bs"
import { HiOutlineDocumentDuplicate, HiOutlineBookOpen } from "react-icons/hi"
import { TbBooks, TbFileUpload } from "react-icons/tb"
import { FiUser, FiLoader } from 'react-icons/fi'
import { FaExclamation } from 'react-icons/fa'
import { MdCloudDone, MdRotateRight } from 'react-icons/md'
import { toast } from "react-toastify"

const FileUpload = () => {
    const [infoData, setInfoData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState('idle');
    const [file, setFile] = useState();
    const [enableUpload, setEnableUpload] = useState(false);

    const FilePickerRef = useRef();
    const { state } = useLocation();
    const { userData, setDocsStateData, setInstituteStateData, setCourseStateData } = useContextData()

    const size = partial({ base: 10 });

    useEffect(() => {
        if (file) setEnableUpload(true);
        if (isUploading === "done") setEnableUpload(false)

        const data = {
            collegeName: state?.collegeInfo?.collegeName,
            courseName: state?.courseInfo?.courseName,
            subjectName: state?.data?.subjectName,
            collegeId: state?.collegeInfo?._id,
            courseId: state?.courseInfo?._id,
            subjectId: state?.data?._id,
        }
        setInfoData(data)
    }, [file, isUploading])


    const handleFileSelection = (e) => {
        const files = e.target.files;
        if (files.length > 10) {
            toast.error("Max File Limit is 10!")
        } else {
            setFile(files ? [...files] : [])
            setIsUploading("idle")
        }
    }

    const HandleUpload = async (e) => {
        e.preventDefault();
        if (file === false || !enableUpload) return;

        setLoading(true);
        setIsUploading("loading")

        let formData = new FormData();
        formData.append("collegeId", infoData?.collegeId);
        formData.append("courseId", infoData?.courseId);
        formData.append("subjectId", infoData?.subjectId);
        formData.append("uploadedBy", userData?.username);

        file.forEach((obj) => {
            formData.append("files", obj, obj.name);
        })

        try {
            const res = await axios.post('/api/upload', formData);
            // console.log(res)

            if (res.status === 201) {
                setInstituteStateData(res.data.savedDocs)
                setCourseStateData(res.data.savedDocs)
                res.data.savedDocs.course.forEach(itm => {
                    if (itm._id == infoData?.courseId) {
                        itm.subjects.forEach(sub => {
                            if (sub._id == infoData?.subjectId) {
                                setDocsStateData([sub])
                            }
                        })
                    }
                })

                // setFile(null)
                setLoading(false)
                setIsUploading("done")
                toast.success("Files Uploaded Successfully!")
            }
        } catch (err) {
            console.log(err)
            setFile(null)
            setLoading(false)
            toast.error(err.message)
            setIsUploading("error")
        }
    }

    return (
        <div className="FileUpload-Main">
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

            {/* <img src={UploadSVG} alt="PeopleSVG" className="FileUpload-Vector" width={280} height="auto" /> */}

            <NavRoute routes={[
                { path: "Institution" },
                { path: `institution/${infoData?.collegeName?.replaceAll(" ", "-")}`, state: state.collegeInfo },
                { path: `institution/${infoData?.collegeName?.replaceAll(" ", "-")}/${infoData?.courseName?.replaceAll(" ", "-")}`, state: { data: state.courseInfo, collegeInfo: state.collegeInfo } },
                { path: `institution/${infoData?.collegeName?.replaceAll(" ", "-")}/${infoData?.courseName?.replaceAll(" ", "-")}/${infoData?.subjectName?.replaceAll(" ", "-")}`, state: state },
                { path: `institution/${infoData?.collegeName?.replaceAll(" ", "-")}/${infoData?.courseName?.replaceAll(" ", "-")}/${infoData?.subjectName?.replaceAll(" ", "-")}/Upload`, state: state }
            ]} />
            <h1>Upload new <span style={{ color: "var(--primary)" }}>Documents</span></h1>

            <form className="FileUpload-Form flex col">
                <div className="FileUpload-Row flex gap2">
                    <div className="FileUpload-InputHolder flex col">
                        <label htmlFor="email">Institution</label>
                        <div className="FileUpload-Input flex gap05" >
                            <input type="text" id="email" style={{ color: "var(--grey)" }} defaultValue={infoData?.collegeName} disabled required />
                            <BsBuilding size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="FileUpload-InputHolder flex col">
                        <label htmlFor="email">Course</label>
                        <div className="FileUpload-Input flex gap05">
                            <input type="text" id="email" style={{ color: "var(--grey)" }} defaultValue={infoData?.courseName} disabled required />
                            <TbBooks size={25} color="var(--grey)" />
                        </div>
                    </div>
                </div>

                <div className="FileUpload-Row flex gap2">
                    <div className="FileUpload-InputHolder flex col">
                        <label htmlFor="email">Subject</label>
                        <div className="FileUpload-Input flex gap05">
                            <input type="text" id="email" style={{ color: "var(--grey)" }} defaultValue={infoData?.subjectName} disabled required />
                            <HiOutlineBookOpen size={25} color="var(--grey)" />
                        </div>
                    </div>
                    <div className="FileUpload-InputHolder flex col">
                        <label htmlFor="email">Document Uploader</label>
                        <div className="FileUpload-Input flex gap05">
                            <input type="text" id="email" style={{ color: "var(--grey)" }} defaultValue={userData?.username} disabled required />
                            <FiUser size={25} color="var(--grey)" />
                        </div>
                    </div>
                </div>

                <div className="FileUpload-Row alignBottom flex gap2">
                    <div className="FileUpload-FilePicker flex" onClick={() => FilePickerRef.current.click()}>
                        <input type="file" accept="application/pdf" name="files" ref={FilePickerRef} style={{ display: 'none' }} multiple onChange={handleFileSelection} />
                        <div className="flex gap05">
                            <HiOutlineDocumentDuplicate size={25} color="var(--grey)" />
                            <span>{file ? `${file.length} files Selected` : "Select Documents"}</span>
                        </div>
                        {file && <div className="FileUpload-NewFiles flex gap05" title="Select New Files">
                            <MdRotateRight size={25} color="inherit" />
                            <span>New</span>
                        </div>}
                    </div>
                    <div className="FileUpload-Submit flex gap05" style={enableUpload ? { backgroundColor: "var(--primary)" } : { backgroundColor: "var(--grey)", cursor: "not-allowed" }} onClick={HandleUpload}>
                        {!loading ?
                            <>
                                <TbFileUpload size={25} color="var(--white)" />
                                <span>Upload</span>
                            </>
                            :
                            <FiLoader size={25} color="var(--white)" style={{ animation: "spin 2s linear infinite" }} />
                        }
                    </div>
                </div>
            </form>

            {file &&
                <div className="FileUpload-FileListContainer">
                    <table border="0" className="FileUpload-FileList" style={{ borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>File Type</th>
                                <th>Size</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {file.map((obj, index) => {
                                let fSize = size(obj.size)
                                return (<tr className="FileUpload-TableRow" key={index}>
                                    <td>{obj.name}</td>
                                    <td>{obj.type === "application/pdf" ? "PDF" : obj.type}</td>
                                    <td>{fSize}</td>
                                    {isUploading === "idle" && <td>-</td>}
                                    {isUploading === "loading" && <td><FiLoader size={25} color="var(--grey)" style={{ animation: "spin 2s linear infinite" }} /></td>}
                                    {isUploading === "done" && <td><MdCloudDone size={25} color="var(--green)" /></td>}
                                    {isUploading === "error" && <td><FaExclamation size={25} color="var(--red)" /></td>}
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div >
    )
}

export default FileUpload