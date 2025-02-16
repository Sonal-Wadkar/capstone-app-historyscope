import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import contact from "../assets/contact.png"
import Footer from "../components/Footer"
import ContactForm from "../components/ContactForm";

function Contact(){
    return(
        <>
            <Navbar />
            <Hero 
                cName = "hero-mid"
                heroImg = {contact}
                tagLine = "Get in Touch"
                btnClass = "hide"
            />
            <ContactForm />
            <Footer />
        </>
    )
}

export default Contact