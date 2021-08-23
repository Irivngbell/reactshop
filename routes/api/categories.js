import express from 'express';
const router = express.Router();
import { check, query, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';
import Category from '../../models/Category.js';

/**
 * @route POST api/categories
 */
router.get('/', async function (req, res) {
    //
    try {
        const categoryInstance = await Category();
        const categories = await categoryInstance.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        res.status(200).json(categories);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

/**
 *
 * @route POST api/categories/create
 * @body object category
 *
 */
router.post(
    '/create',
    [auth, [check('name', 'le nom est obligatoire').trim().escape()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name } = req.body;
            const categoryInstance = Category();

            // INSERT INTO categories (name) VALUES name;
            const category = await categoryInstance.create({
                name: name,
            });

            res.status(200).json({ category, msg: 'Categorie cree' });
        } catch (e) {
            res.status(500).send({ msg: e.errors[0].message });
        }
    }
);

/**
 * @route PATCH api/categories/update
 * @body object category
 */
router.patch(
    '/update',
    [auth, [check('name', 'le nom est pas correct').trim().escape()]],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id, name } = req.body;
            const categoryInstance = Category();

            await categoryInstance.update(
                { name, createdAt: new Date() },
                { where: { id } }
            );

            res.status(200).json({ msg: 'Categorie updated' });
        } catch (e) {
            res.status(400).send('Server Error');
        }
    }
);

/**
 * @route GET api/categories/destroy?id=id
 * @query param id
 * @example: C'est un exemple de GET avec query string, en temps normal on utilise router.delete
 */
router.get(
    '/destroy',
    [auth, [query('id', 'Id est pas correcte').trim().escape().isInt()]],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.query.id;

        try {
            const categoryInstance = Category();

            const category = await categoryInstance.destroy({ where: { id } });

            res.status(200).json({ msg: 'Bye Bye category' });
        } catch (e) {
            res.status(400).send('Server Error');
        }
    }
);

export default router;
