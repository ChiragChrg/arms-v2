import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify"
import { useContextData } from '../../Hooks/useContextData';
import { MdDeleteForever, MdClose } from "react-icons/md"
import { FiLoader } from "react-icons/fi"

const DeleteData = () => {
    const [loading, setLoading] = useState(false);
    const { manageDelete, setManageDelete, setInstituteStateData, setCourseStateData } = useContextData()
    const DeleteRef = useRef();
    const navigate = useNavigate()

    const HandleDelete = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (DeleteRef.current.value !== `Delete ${manageDelete.name}`) {
            toast.warn("Invalid confirmation text!")
            setLoading(false)
            return;
        }

        if (manageDelete.title == "Subject") {
            //Delete Subject
            try {
                const res = await axios.post('/api/deletesubject', manageDelete)
                // console.log(res)

                if (res.status == 200) {
                    setLoading(false)
                    setInstituteStateData(res.data?.deletedSub)
                    setCourseStateData(res.data?.deletedSub)
                    toast.success(manageDelete.title + " Deleted Sucessfully!")
                    setManageDelete(null)
                    navigate(manageDelete.backPath, {
                        state: {
                            data: manageDelete.backState.courseInfo,
                            collegeInfo: manageDelete.backState.collegeInfo,
                        }
                    })
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            }
        } else if (manageDelete.title == "Course") {
            //Delete Course
            try {
                const res = await axios.post('/api/deletecourse', manageDelete)
                // console.log(res)

                if (res.status == 200) {
                    setLoading(false)
                    setInstituteStateData(res.data?.deletedCourse)
                    setCourseStateData(res.data?.deletedCourse)
                    toast.success(manageDelete.title + " Deleted Sucessfully!")
                    setManageDelete(null)
                    navigate(manageDelete.backPath, { state: manageDelete.backState })
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            }
        } else if (manageDelete.title == "Institute") {
            //Delete Institute
            try {
                const res = await axios.post('/api/deleteinstitute', manageDelete)
                // console.log(res)

                if (res.status == 200) {
                    setLoading(false)
                    toast.success(manageDelete.title + " Deleted Sucessfully!")
                    setManageDelete(null)
                    navigate(manageDelete.backPath)
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            }
        }
    }

    return (
        <div className="BackdropModal flex">
            <div className="Modal-Card flex col">
                <div className="Modal-Header flex">
                    <h2>Delete {manageDelete.title}</h2>
                    <MdClose size={30} color="var(--red)" className="Modal-Close" onClick={() => setManageDelete(null)} />
                </div>

                <h4>Confirm to delete <span style={{ color: "var(--primary)" }}>{manageDelete.name.toUpperCase()}</span> ? <br /> This will delete all the uploaded documents in this {manageDelete.title.toLowerCase()}.</h4>

                <form className="Modal-Form flex col gap" onSubmit={HandleDelete} >
                    <div className="NewInstitute-InputHolder flex col">
                        <label >Type "<span style={{ color: "var(--red)" }}>
                            Delete {manageDelete.name}</span>" to confirm.
                        </label>
                        <div className="NewInstitute-Input flex gap05">
                            <input type="text" maxLength={7 + manageDelete.name.length} placeholder={`Delete ${manageDelete.name}`} ref={DeleteRef} required />
                        </div>
                    </div>

                    <button type="submit" className="Modal-SubmitBtn flex">
                        {!loading ?
                            <div className="flex gap05">
                                <MdDeleteForever size={25} color="inherit" />
                                <span>Delete {manageDelete.title}</span>
                            </div>
                            :
                            <FiLoader size={25} color="inherit" style={{ animation: "spin 2s linear infinite" }} />}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DeleteData