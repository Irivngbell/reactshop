import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

function Steps() {
    const [html, setHtml] = useState();

    const loc = useLocation();

    useEffect(() => {
        axios
            .get(loc.pathname)
            .then(res => setHtml(res.data))
            .catch(e => console.log(e.data.message));
    });

    return (
        <div className="container redux-steps mt-5 mb-5">
            <Link to="/blog">Back</Link>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
        </div>
    );
}

export default Steps;
