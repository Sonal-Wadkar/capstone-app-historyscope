import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import sservice from "../assets/sservice.png"
import Footer from "../components/Footer";
import Explore from "../components/Explore"

function Services(){
    return(
        <>
            <Navbar />
            <Hero 
                cName = "hero-mid"
                heroImg = {sservice}
                //tagLine = "Our Services"
                btnClass = "hide"
            />
            <Explore />
            <Footer />
        </>
    )
}

export default Services