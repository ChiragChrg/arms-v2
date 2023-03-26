import "./Modals.css"
import { useState } from 'react'
import { useContextData } from "../../Hooks/useContextData"
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdDeleteForever, MdClose } from "react-icons/md"
import { FiLoader } from "react-icons/fi"

const DeleteUser = ({ deleteUser, setFaculty }) => {
    const [loading, setLoading] = useState(false)
    const { setDeleteUser } = useContextData()

    const HandleDelete = async () => {
        setLoading(true)
        try {
            const res = await axios.post('/api/decline', { userId: deleteUser._id, actionMsg: "Deleted" })
            if (res.status == 200) {
                setLoading(false)
                toast.success(res.data.message)
                // setFaculty(prev => prev.filter((obj) => obj._id !== deleteUser._id))
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
            toast.error(err.message)
        }
    }

    return (
        <div className="BackdropModal flex">
            <div className="Modal-Card flex col">
                <div className="Modal-Header flex">
                    <h2>Delete User</h2>
                    <MdClose size={30} color="var(--red)" className="Modal-Close" onClick={() => setDeleteUser(null)} />
                </div>

                <div className="Modal-Avatar flex">
                    <img src={deleteUser.avatarImg} alt={deleteUser.username} />
                </div>

                <h4 style={{ fontSize: "1em !important" }}>Confirm to delete <span style={{ color: "var(--primary)" }}>{deleteUser.username}</span> ?</h4>

                <div className="Modal-Buttons flex">
                    <div className="Modal-Cancel flex" onClick={() => setDeleteUser(null)}>Cancel</div>
                    <div className="Modal-Delete flex" onClick={HandleDelete}>
                        {!loading ?
                            <div className="flex gap05">
                                <MdDeleteForever size={20} color="inherit" />
                                <span>Delete User</span>
                            </div>
                            :
                            <FiLoader size={25} color="inherit" style={{ animation: "spin 2s linear infinite" }} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser