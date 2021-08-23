import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';
import Role from '../../models/Role.js';
/**
 * @route /api/users
 */
router.get('/', auth, async (req, res) => {
  try {
    const users = await User().findAll({
      include: [
        {
          model: Role(),
          required: true,
        },
      ],
    });

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
});

/**
 *
 *@route POST api/users
 */
router.post(
  '/register',
  [
    check('email', 'Email must be valid').trim().isEmail(),
    check('password', 'Password must be 6 chars in length')
      .exists()
      .trim()
      .escape()
      .isLength({
        min: 6,
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const userInstance = User();

      const user = userInstance.build({
        email,
        password,
      });

      let existingUser = await userInstance.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }],
        });
      }
      // Hash password with salt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Attribuer un rôle ici
      const roleInstance = Role();
      const role = await roleInstance.findOne({
        where: {
          name: process.env.CUSTOMER,
        },
      });

      user.role_id = role.id;

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.APP_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route /api/users/update
 * @method PATCH
 */
router.patch(
  '/update',
  [
    auth,
    [
      check('email', 'Email must be valid').trim().isEmail(),
      check('name', 'Le champ name est mal formé')
        .trim()
        .escape()
        .isLength({ min: 4 }),
      check('avatar', "Le format n'est pas correct").trim(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Récupérer id user
      const { id } = req.user;

      const { name, email, avatar } = req.body;

      // Mettre a jour user
      const userInstance = User();

      const user = await userInstance.update(
        {
          name: name,
          email: email,
          avatar: avatar,
        },
        { where: { id } }
      );

      // envoyer la réponse
      res.status(200).json({ msg: 'Utilisateur mis à jour' });
    } catch (e) {
      res.status(500).json({ msg: e.errors });
    }
  }
);

/**
 * @route /api/users/role
 * @method POST
 */
router.post(
  '/role',
  [
    auth,
    [
      check('userId', 'Un erreur sur userId').not().isEmpty().escape().isInt(),
      check('roleId', 'Un erreur sur roleId').not().isEmpty().escape().isInt(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { userId, roleId } = req.body;

      const userInstance = User();
      //
      // Comment ça se passe behind the scenes :
      // UPDATE users SET role_id = ? WHERE id = ?
      // let options = [userId = 1, roleId = 2];
      // let requete = 'UPDATE `users` SET `role_id`=?,`updatedAt`=? WHERE `id` = ?';
      // requete.execute(options, $2, Date.now(),$1);
      await userInstance.update(
        {
          role_id: roleId,
        },
        {
          where: { id: userId },
        }
      );

      const user = await userInstance.findOne({
        where: { id: userId },
        include: [
          {
            model: Role(),
            required: true,
          },
        ],
      });

      res.status(200).json({ user });
    } catch (e) {
      console.log(e);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

/**
 * @route /api/users/employees
 */
router.post(
  '/employees',
  [
    auth,
    [
      check('email', 'Email must be valid').trim().isEmail(),
      check('password', 'Password must be 6 chars in length')
        .exists()
        .trim()
        .escape()
        .isLength({
          min: 6,
        }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const userInstance = User();

      const user = userInstance.build({
        email,
        password,
      });

      let existingUser = await userInstance.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }],
        });
      }
      // Hash password with salt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Attribuer un rôle ici
      const roleInstance = Role();
      const role = await roleInstance.findOne({
        where: {
          name: process.env.BASIC_ROLE,
        },
      });

      user.role_id = role.id;

      await user.save();

      res.status(200).json({ user, msg: 'Employé embauché !' });
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

export default router;
