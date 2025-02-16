import "./FooterStyles.css";

const Footer = () => {
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1>HistoryScope</h1>
                    <p>World on Fingertips.</p>
                </div>
            </div>

            <div className="bottom">
                <div>
                    <h4>Community</h4>
                    <a href="/">Github</a>
                </div>

                <div>
                    <h4>Help</h4>
                    <a href="/contact">Contact Us</a>
                </div>

            </div>
        </div>
    )
}

export default Footer