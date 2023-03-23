import "./Faculty.css"
import { useState, useEffect } from 'react'
import axios from 'axios'
import MobileHam from '../../Components/MobileHam/MobileHam'
import moment from 'moment'
import Skeleton from '@mui/material/Skeleton';

const Faculty = () => {
    const [faculty, setFaculty] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const GetFaculty = async () => {
            setLoading(true)
            try {
                const res = await axios.get('/api/getusers')

                if (res.status == 200) {
                    setFaculty(res.data.UserDB)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        GetFaculty()
    }, [])

    return (
        <div className="Faculty-Main">
            <MobileHam />
            <h1>Authorized <span style={{ color: "var(--primary)" }}>Faculties</span></h1>

            {!loading ?
                <div className="Faculty-List flex col gap">
                    {faculty.map((obj, index) => {
                        return <div className="Faculty-User flex gap" key={index}>
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
        </div>
    )
}

export default Faculty