import { useContextData } from "../../Hooks/useContextData"
import { BsFilterLeft } from 'react-icons/bs'

const MobileHam = () => {
    const { setShowSidebar } = useContextData()

    return (
        <div className="MobileHam-Main flex" onClick={() => setShowSidebar(true)}>
            <BsFilterLeft size={40} />
        </div>
    )
}

export default MobileHam