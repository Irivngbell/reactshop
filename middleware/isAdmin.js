import User from '../models/User.js';

export default async function (req, res, next) {
    try {
        const { userId } = req.user;

        // Aller chercher l'utilisateur avec le rôle qui lui est attribué

        next();
    } catch (e) {
        console.error(e);
        res.status(401).json({ msg: 'Caught an error somewhere' });
    }
}
