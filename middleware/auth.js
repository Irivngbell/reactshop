import jwt from 'jsonwebtoken';

export default async function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'Auth denied' });
    }
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET);

        req.user = decoded.user;

        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ msg: 'Caught an error somewhere' });
    }
}
