import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import main from "../assets/main.png"
import Information from "../components/Information";
import Explore from "../components/Explore";
import Footer from "../components/Footer";

function Home(){
    return(
        <>
            <Navbar />
            <Hero 
                cName = "hero"
                heroImg = {main}
                tagLine = "Partake and Protect the Past"
                subTag = "Explore History at a whole new LEVEL!!"
                url = "/"
            />
            <Information />
            <Explore />
            <Footer />
        </>
    )
}

export default Home