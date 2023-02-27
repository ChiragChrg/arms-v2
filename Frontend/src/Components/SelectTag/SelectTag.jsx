import "./SelectTag.css"
import { useState, useEffect, useRef } from "react"
import { FaChevronDown } from "react-icons/fa"

const SelectTag = ({ defaultOption = "Select Option", optionArray, returnValue }) => {
    const [selectedValue, setSelectedValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const SelectRef = useRef();

    useEffect(() => {
        setShowDropdown(false)
        returnValue(selectedValue)
        SelectRef.current.childNodes[1].classList.remove("active")
    }, [selectedValue])

    return (
        <div className="SelectTag-Main" tabIndex={0} ref={SelectRef} onClick={() => setShowDropdown(true)} >
            <span className="flex" style={selectedValue !== "" ? { color: "var(--text)" } : { color: "var(--grey)" }}>
                {selectedValue !== "" ? selectedValue : defaultOption}
                <FaChevronDown size={18} color="var(--grey)" />
            </span>

            <div className={showDropdown ? "SelectTag-Dropdown active flex col gap05" : "SelectTag-Dropdown"}>
                {
                    optionArray.map((obj, index) => {
                        return <div className="SelectTag-Option" key={index} onClick={() => setSelectedValue(obj)}>
                            {obj}
                        </div>
                    })
                }
            </div>
        </div >
    )
}

export default SelectTag