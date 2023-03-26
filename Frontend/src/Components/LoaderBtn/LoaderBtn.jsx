import "./LoaderBtn.css"
import { FiLoader, FiCheck, FiPlus } from "react-icons/fi"
import { BiKey } from "react-icons/bi"

const LoaderBtn = ({ type = "", onClick, loading, className = "", text = "", iconType = "", iconSize = 25 }) => {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            {loading ?
                <button className={className} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5em" }} disabled>
                    <FiLoader size={25} style={{ animation: "spin 2s linear infinite" }} />
                </button>
                :
                <button type={type} className={className} onClick={onClick} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5em" }}>
                    {iconType == "plus" && <FiPlus size={iconSize} color="inherit" />}
                    {iconType == "check" && <FiCheck size={iconSize} color="inherit" />}
                    {iconType == "key" && <BiKey size={iconSize} color="inherit" />}
                    <span>{text}</span>
                </button>
            }
        </div>
    )
}

export default LoaderBtn