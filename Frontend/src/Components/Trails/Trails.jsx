import "./Trails.css"
import { useState, useEffect, useRef } from "react"
import { MdPlayArrow, MdPlayDisabled } from "react-icons/md"

const Trails = ({ angle, position }) => {
    const [disableAnimation, setDisableAnimation] = useState(false);
    const StripCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const TrailsRef = useRef();

    useEffect(() => {
        if (angle) TrailsRef.current.style.transform = `rotate(${angle}deg)`;
        if (position == "center") TrailsRef.current.style.right = "0";
        if (position == "left") TrailsRef.current.style.right = "20%";
    }, [angle, position])

    return (
        <>
            <div className="Trails-Main" ref={TrailsRef}>
                <div className="Trails-Holder flex col gap2">
                    {StripCount.map((item) => {
                        return <div key={item} data-disableAnime={disableAnimation} className="Trails-Trail flex"></div>
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