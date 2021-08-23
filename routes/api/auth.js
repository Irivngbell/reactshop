import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { check, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';
import User from '../../models/User.js';
import Role from '../../models/Role.js';

// @route get api/auth
router.get('/', auth, async (req, res) => {
  try {
    const userInstance = User();
    // SELECT name, email, password, createdAt, updatedAt FROM users where id = id;

    const user = await userInstance.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Role(),
          required: true,
        },
      ],
    });

    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).send('Server Error');
  }
});

// @route post api/auth
router.post(
  '/',
  [
    check('email', 'Email must be valid').trim().isEmail(),
    check('password', 'Password is required')
      .exists()
      .trim()
      .escape()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      // Does user exist ?
      const userInstance = User();
      const user = await userInstance.findOne({
        where: { email: email },
        attributes: { exclude: ['name', 'createdAt', 'updatedAt'] },
      });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Email or password invalid' }],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Email or password invalid' }],
        });
      }

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

export default router;
