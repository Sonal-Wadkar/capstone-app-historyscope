import { Component } from "react";
import "./InformationStyles.css";

class InformationData extends Component{
    render(){
        return(
            <div className="information">
            <h1>{this.props.heading}</h1>
            <p>{this.props.text1}</p>
            <br></br>
            <p>{this.props.text2}</p>
        </div>
        )
    }
}

export default InformationData