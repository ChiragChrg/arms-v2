import "./About.css"
// import NavRoute from "../../Components/NavRoute/NavRoute";
import MobileHam from "../../Components/MobileHam/MobileHam"

const About = () => {
    const routes = [
        "Ganja",
        "About",
        "Contact"
    ]

    return (
        <div className="About-Main">
            {/* <NavRoute routes={routes} /> */}
            <MobileHam />
            <h1>About</h1>
        </div>
    )
}

export default About