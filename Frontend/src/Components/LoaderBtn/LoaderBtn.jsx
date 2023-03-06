import "./LoaderBtn.css"
import { FiLoader, FiCheck, FiPlus } from "react-icons/fi"

const LoaderBtn = ({ type, onClick, loading, className, text, iconType = "", iconSize = 25 }) => {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <style>{`
            @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
            }
        `}</style>

            {loading ?
                <button type={type} className={className} disabled>
                    <FiLoader size={25} style={{ animation: "spin 2s linear infinite" }} />
                </button>
                :
                <button type={type} className={className} onClick={onClick} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5em" }}>
                    {iconType == "plus" && <FiPlus size={iconSize} color="inherit" />}
                    {iconType == "check" && <FiCheck size={iconSize} color="inherit" />}
                    <span>{text}</span>
                </button>
            }
        </div>
    )
}

export default LoaderBtn