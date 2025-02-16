import "./AboutUsStyles.css"

function AboutUs(){
    return(
        <>
            <div className="intro">
                <h1>Who are we?</h1>
                <p>This is the Capstone Project, Group no: for the Final Year of Diploma in Computer Engineering in Jayawantrao Sawant Polytechnic.</p>
            </div>
            <div className="table">
                <h1>Team Members</h1>
                <table className="about-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No.</th>
                            <th>Enrollment No.</th>
                            </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Wadkar Sonal Ravindra</td>
                            <td>44</td>
                            <td>2207110365</td>
                        </tr>
                        <tr>
                            <td>Magar Samruddhi Ganesh</td>
                            <td>179</td>
                            <td>2207110877</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AboutUs