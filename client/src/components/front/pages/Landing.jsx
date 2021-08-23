import { Fragment } from 'react';
import Header from '../common/Header';
import Featured from './Featured';
import Blog from './Blog';
import Footer from '../../Footer';
const Landing = () => {
    return (
        <Fragment>
            <Header />
            <Featured />
            <Blog />
            <Footer />
        </Fragment>
    );
};

export default Landing;
