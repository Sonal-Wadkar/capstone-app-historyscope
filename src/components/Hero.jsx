import "./HeroStyles.css";

function Hero(props) {
    return (
        <>
            <div className={props.cName}>
                <img src={props.heroImg} alt="hero-image" />
                <div className="heroText">
                    <h1>{props.tagLine}</h1>
                    <p>{props.subTag}</p>
                    
                </div>
            </div>
        </>
    );
}

export default Hero;
