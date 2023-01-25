import "./Trails.css"
import { useEffect, useRef } from "react"

const Trails = ({ angle, center }) => {
    const StripCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const TrailsRef = useRef();

    useEffect(() => {
        if (angle) TrailsRef.current.style.transform = `rotate(${angle}deg)`;
        if (center) TrailsRef.current.style.right = "0";
    }, [angle, center])

    return (
        <div className="Trails-Main" ref={TrailsRef}>
            <div className="Trails-Holder flex col gap2">
                {StripCount.map((item) => {
                    return <div key={item} className="Trails-Trail flex"></div>
                })}
            </div>
        </div>
    )
}

export default Trails