import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div className="blog-section">
            <div className="container">
                <h1 className="text-center">Blog</h1>
                <p>
                    <Link to="/blog/steps/express">Express</Link>
                </p>
                <p>
                    <Link to="/blog/steps/redux">Redux</Link>
                </p>
            </div>
        </div>
    );
};

export default Blog;
