import "./About.css"
import NavRoute from "../../Components/NavRoute/NavRoute";

const About = () => {
    const routes = [
        "Ganja",
        "About",
        "Contact"
    ]

    return (
        <div className="About-Main">
            <NavRoute routes={routes} />
            <h1>About</h1>
        </div>
    )
}

export default About