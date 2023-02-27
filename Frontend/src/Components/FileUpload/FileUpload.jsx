import "./FileUpload.css"
import { useState, useEffect, useRef } from 'react'
import SelectTag from "../SelectTag/SelectTag"
import axios from "axios"
import { partial } from "filesize";
import NavRoute from "../NavRoute/NavRoute"

import { BsBuilding, BsCalendar3 } from "react-icons/bs"
import { HiOutlineDocumentDuplicate, HiOutlineBookOpen } from "react-icons/hi"
import { TbBooks, TbFileUpload, TbRuler } from "react-icons/tb"
import { FiLoader } from 'react-icons/fi'
import { FaExclamation } from 'react-icons/fa'
import { MdCloudDone, MdRotateRight } from 'react-icons/md'

const FileUpload = () => {
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState('idle');
    const [file, setFile] = useState();
    // const [fileArray, setFileArray] = useState();

    const FilePickerRef = useRef();
    //fetch list of courses for curr dept when page loads

    const ArrList = ["yolos", "djsfsdf", "sdjfisf", "sjidfijif"]
    const ArrSem = [1, 2, 3, 4, 5, 6]
    const size = partial({ base: 10 });


    const handleFileSelection = (e) => {
        const files = e.target.files;
        setFile(files ? [...files] : [])
    }

    const HandleUpload = async (e) => {
        e.preventDefault();
        if (file === false) return;

        setLoading(true);
        setIsUploading("loading")

        let formData = new FormData();
        formData.append("institution", "Srinivas University");
        formData.append("course", course);
        formData.append("semester", semester);
        formData.append("subject", subject);

        file.forEach((obj) => {
            formData.append("files", obj, obj.name);
        })

        try {
            console.log(file, formData)
            // const res = await axios.post('/api/upload', formData);
            // console.log(res)
        } catch (err) {
            console.log(err)
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

            <NavRoute routes={["Institution", "Upload"]} />
            <h1>Upload Document {course} {semester}</h1>

            <form className="FileUpload-Form">
                <div className="FileUpload-Row flex gap2">
                    <div className="FileUpload-InputHolder flex col">
                        <label htmlFor="email">Institution</label>
                        <div className="FileUpload-Input flex gap05" >
                            <input type="text" id="email" style={{ color: "var(--grey)" }} defaultValue="Srinivas University" disabled required />
                            <BsBuilding size={25} color="var(--grey)" />
                        </div>
                    </div>

                    <div className="FileUpload-InputHolder flex col">
                        <label htmlFor="email">Course</label>
                        <div className="FileUpload-Input flex gap05">
                            <SelectTag defaultOption="Select Course" optionArray={ArrList} returnValue={(value) => setCourse(value)} />
                            <TbBooks size={25} color="var(--grey)" />
                        </div>
                    </div>
                </div>

                <div className="FileUpload-Row flex gap2">
                    <div className="FileUpload-InputHolder flex col">
                        <label htmlFor="email">Semester</label>
                        <div className="FileUpload-Input flex gap05">
                            <SelectTag defaultOption="Select Semester" optionArray={ArrSem} returnValue={(value) => setSemester(value)} />
                            <BsCalendar3 size={25} color="var(--grey)" />
                        </div>
                    </div>
                    <div className="FileUpload-InputHolder flex col">
                        <label htmlFor="email">Subject</label>
                        <div className="FileUpload-Input flex gap05">
                            <SelectTag defaultOption="Select Semester" optionArray={ArrList} returnValue={(value) => setSubject(value)} />
                            <HiOutlineBookOpen size={25} color="var(--grey)" />
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
                        <MdRotateRight size={25} color="var(--grey)" title="Select New Files" />
                    </div>
                    <div className="FileUpload-Submit flex gap05" onClick={HandleUpload}>
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
                <table border="0" className="FileUpload-FileList" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <th>File Name</th>
                        <th>File Type</th>
                        <th>Size</th>
                        <th>Status</th>
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
                </table>}
        </div >
    )
}

export default FileUpload