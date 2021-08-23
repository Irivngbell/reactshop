import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';
import Role from '../../models/Role.js';

/**
 * @route POST api/roles
 */
router.get('/', async function (req, res) {
    //
    try {
        const roleInstance = await Role();
        const roles = await roleInstance.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        res.status(200).json(roles);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

/**
 *
 * @route POST api/roles/create
 * @body object role
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
            const categoryInstance = Role();

            const category = await categoryInstance.create({
                name: name,
            });

            res.status(200).json({ category, msg: 'Role cree' });
        } catch (e) {
            console.log(e.errors);
            res.status(500).send({ msg: e.errors[0].message });
        }
    }
);

/**
 * @route PATCH api/roles/update
 * @body object role
 */
router.patch(
    '/update',
    [
        auth,
        [
            check('name', 'le nom est pas correct')
                .not()
                .isEmpty()
                .exists()
                .trim()
                .escape(),
        ],
    ],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id, name } = req.body;

        try {
            const roleInstance = Role();

            await roleInstance.update({ name }, { where: { id: id } });

            res.status(200).json({ msg: 'Role updated' });
        } catch (e) {
            res.status(400).send('Server Error');
        }
    }
);

/**
 * @route DELETE api/roles/destroy?id=id
 * @query param id
 */
router.delete(
    '/destroy',
    [auth, [check('id', 'Id est pas correcte').trim().escape().isInt()]],
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id } = req.body;

            const roleInstance = Role();

            // delete from roles where id = ?
            await roleInstance.destroy({ where: { id } });

            res.status(200).json({ msg: 'Bye Bye role' });
        } catch (e) {
            res.status(400).send('Server Error');
        }
    }
);

export default router;
