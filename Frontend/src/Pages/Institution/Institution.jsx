import "./Institution.css"
import { useState, useEffect, useContext } from "react"
import NavRoute from "../../Components/NavRoute/NavRoute"
import { useContextData } from "../../Hooks/useContextData"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import MobileHam from "../../Components/MobileHam/MobileHam"
import Skeleton from '@mui/material/Skeleton';
import { FiPlus } from "react-icons/fi"
import { BsBuilding } from "react-icons/bs"

const Institution = () => {
    const [institutions, setInstitutions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setInstituteStateData, setCourseStateData, setDocsStateData, authorizedUser } = useContextData()

    useEffect(() => {
        const GetInstitutions = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/getinstitutions')
                if (res.status === 200) {
                    setInstitutions(res.data.DocsDB)
                    setLoading(false);
                }
            } catch (err) {
                console.log(err)
                toast.error(err.response?.data?.message || err.message + ". Try again later.")
                setLoading(false);
            }
        }
        GetInstitutions()

        //Resetting Temp State Data 
        setInstituteStateData([])
        setCourseStateData([])
        setDocsStateData([])
    }, [])

    return (
        <div className="Institution-Main">
            <NavRoute routes={[{ path: "Institution" }]} />

            <div className="Institution-Header flex">
                <h1>Institutions</h1>

                <div className="Institution-Nav flex gap">
                    <MobileHam />
                    {authorizedUser && <Link to="new" className="Institution-Create flex gap05">
                        <FiPlus size={25} color="inherit" />
                        <span>New Institution</span>
                    </Link>}
                </div>
            </div>

            {!loading ? <div className="Institution-Cards">
                {institutions.map((obj, index) => {
                    return <Link key={index} state={obj} to={`${obj.collegeName.replaceAll(" ", "-").toLowerCase()}`} className="Institution-Card flex col">
                        <div className="Institution-Icon flex">
                            <BsBuilding size={30} color="var(--white)" />
                        </div>
                        <h2>{obj.collegeName}</h2>
                        <p>{obj.description}</p>
                    </Link>
                })}
            </div>
                :
                <div className="Institution-Cards">
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                    <Skeleton variant="rounded" animation="wave" width={324} height={145} />
                </div>
            }
        </div>
    )
}

export default Institution