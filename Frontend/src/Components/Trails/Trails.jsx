import "./Trails.css"
import { useState, useEffect, useRef } from "react"
import { MdPlayArrow, MdPlayDisabled } from "react-icons/md"

const Trails = ({ angle, position, top }) => {
    const [disableAnimation, setDisableAnimation] = useState(false);
    const TrailsRef = useRef();

    const StripCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        if (angle) TrailsRef.current.style.transform = `rotate(${angle}deg)`;
        if (position == "center") TrailsRef.current.style.right = "0";
        if (position == "left") TrailsRef.current.style.right = "20%";
        if (top) TrailsRef.current.style.top = top;
    }, [angle, position, top])

    return (
        <>
            <div className="Trails-Main" ref={TrailsRef}>
                <div className="Trails-Holder flex col">
                    {StripCount.map((item) => {
                        return <div key={item} data-disableanime={disableAnimation} className="Trails-Trail flex"></div>
                    })}
                </div>
            </div>

            <div className="Trails-Disable flex" onClick={() => setDisableAnimation(prev => !prev)} title={disableAnimation ? "Play Animation" : "Disable Animation"}>
                {disableAnimation ?
                    <MdPlayDisabled size={25} color="var(--primary)" />
                    : <MdPlayArrow size={25} color="var(--primary)" />
                }
            </div>
        </>
    )
}

export default Trails