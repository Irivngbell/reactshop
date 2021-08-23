import { Link } from 'react-router-dom';

const Thanks = () => {
    return (
        <div className="thank-you-section">
            <h1>
                Thank you for <br /> Your Order!
            </h1>
            <p>A confirmation email was sent</p>
            <div className="spacer" />
            <div>
                <Link to="/" className="button">
                    Home Page
                </Link>
            </div>
            <div className="spacer" />
        </div>
    );
};

export default Thanks;
