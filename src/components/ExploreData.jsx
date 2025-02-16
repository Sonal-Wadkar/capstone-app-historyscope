import "./ExploreStyles.css";

function ExploreData(props){
    return(
        <div className="e-card">
            <div className="e-img">
                <img src={props.image} alt="image" />
            </div>
            <h4>{props.head}</h4>
            <p>{props.text}</p>
        </div>
    )
}

export default ExploreData;