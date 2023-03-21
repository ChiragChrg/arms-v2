import "./Approval.css"
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Skeleton from '@mui/material/Skeleton';
import { toast } from "react-toastify"
import emailjs from '@emailjs/browser';

import { ApproveSVG } from "../../Assets"
import MobileHam from '../../Components/MobileHam/MobileHam'
import { FiCheck, FiLoader } from "react-icons/fi"
import { MdClose } from "react-icons/md"

const Approval = () => {
    const [pendingUsers, setPendingUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)

    useEffect(() => {
        const GetPending = async () => {
            setLoading(true)
            try {
                const res = await axios.get("/api/pending")
                // console.log(res)
                if (res.status == 200) {
                    setPendingUsers(res.data.UserDB)
                    setLoading(false)
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
        GetPending()
    }, [])

    const HandleAction = async (action, user, index) => {
        try {
            let isSuccess = false;

            if (action == "Approve") {
                setLoadingBtn("Approve")
                const res = await axios.post('/api/approve', { userId: user._id })
                if (res.status == 200) {
                    toast.success(res.data.message)
                    isSuccess = true

                    //Sending Mail to User
                    let templateParams = {
                        to_name: user.username,
                        to_email: user.email
                    }
                    const mailRes = await emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID,
                        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                        templateParams,
                        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                    );

                    setLoadingBtn(false)
                }
            } else {
                setLoadingBtn("Decline")
                const res = await axios.post('/api/decline', { userId: user._id })
                if (res.status == 200) {
                    toast.success(res.data.message)
                    isSuccess = true
                    setLoadingBtn(false)
                }
            }

            if (isSuccess) {
                setPendingUsers(prev => prev.filter((obj, indx) => indx !== index))
            }
        } catch (err) {
            console.log(err)
            setLoadingBtn(false)
            toast.error(err.message)
        }
    }

    return (
        <div className="Approval-Main">
            <MobileHam />

            <h1>Approve new <span style={{ color: "var(--primary)" }}>Faculty</span></h1>

            {!loading ? <div className="Approval-UserList flex col gap">
                {pendingUsers.map((obj, index) => {
                    return <div className="Approval-User flex" key={index}>
                        <div className="flex gap2">
                            <div className="Approval-Avatar flex">
                                <img src={obj.avatarImg} alt={obj.username} className="Sidebar-Avatar" />
                            </div>

                            <div className="Approval-UserInfo flex col gap05">
                                <h3>{obj.username}</h3>
                                <div className="Approval-UserDetails flex gap">
                                    <span>Email: {obj.email}</span>
                                    <span>Request Date: {moment(obj.createdAt).format('LL')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="Approval-Buttons flex gap">
                            <div className="Approval-Approve flex gap05" onClick={() => HandleAction("Approve", obj, index)}>
                                {loadingBtn == "Approve" ?
                                    <FiLoader size={25} color="inherit" style={{ animation: "spin 2s linear infinite" }} />
                                    :
                                    <FiCheck size={25} color="inherit" />
                                }
                                <p>Approve</p>
                            </div>
                            <div className="Approval-Reject flex" onClick={() => HandleAction("Decline", obj, index)}>
                                {loadingBtn == "Decline" ?
                                    <FiLoader size={25} color="inherit" style={{ animation: "spin 2s linear infinite" }} />
                                    :
                                    <MdClose size={25} color="inherit" />
                                }
                                <p>Decline</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
                :
                <div className="Approval-Skeletons flex col gap">
                    <Skeleton variant="rounded" animation="wave" width="100%" height={65} />
                    <Skeleton variant="rounded" animation="wave" width="100%" height={65} />
                    <Skeleton variant="rounded" animation="wave" width="100%" height={65} />
                    <Skeleton variant="rounded" animation="wave" width="100%" height={65} />
                    <Skeleton variant="rounded" animation="wave" width="100%" height={65} />
                    <Skeleton variant="rounded" animation="wave" width="100%" height={65} />
                </div>
            }

            {pendingUsers.length == 0 &&
                <div className="Approval-Vector flex col gap">
                    <img src={ApproveSVG} alt="ApproveSVG" width="300px" height="auto" />
                    <h3>No new faculties yet...</h3>
                </div>}
        </div>
    )
}

export default Approval