import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import aboutt from "../assets/aboutt.png"
import Footer from "../components/Footer"
import AboutUs from "../components/AboutUs";

function About(){
    return(
        <>
            <Navbar />
            <Hero 
                cName = "hero-mid"
                heroImg = {aboutt}
                tagLine = "About"
                btnClass = "hide"
            />
            <AboutUs />
            <Footer />
        </>
    )
}

export default About