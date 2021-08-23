import express from 'express';
const router = express.Router();
import { check, query, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';
import Article from '../../models/Article.js';
import Category from '../../models/Category.js';

/**
 * @route GET /api/articles
 */
router.get('/', async function (req, res) {
  //

  try {
    let articleInstance = Article();

    const articles = await articleInstance.findAll();
    res.status(200).json(articles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

/**
 *
 * @route POST api/articles/create
 * @body object article
 *
 */
router.post(
  '/create',
  [auth, [check('title', 'le titre est obligatoire').trim().escape()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { category_id, title, metaDescription, body } = req.body;

      const catInstance = Category();

      // L'ORM sequelize se charge de la sécurité, mais il faut bien retenir les principes appliqués
      // prepare 'select * from categories where id = category_id'
      // bindParam(:id, category_id)
      // exécute la requête
      const cat = await catInstance.findOne({
        where: {
          id: category_id,
        },
      });
      let articleInstance = Article();

      // insert into articles (category_id, user_id, title, metaDescription, body)
      // VALUES (?, ?, ?, ?, ?);
      // bindParam pour chaque param.
      // Et ensuite on exécute.
      const article = await articleInstance.create({
        category_id: cat.id,
        user_id: 1,
        title: title,
        metaDescription: metaDescription,
        body: body,
      });

      res.status(200).json({ article, msg: 'Article cree' });
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route POST api/articles/update
 * @body object category
 */
router.patch(
  '/update',
  [auth, [check('title', 'le titre est pas correct').trim().escape()]],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, metaDescription, category_id, title, body } = req.body;

    try {
      const artInstance = Article();

      // update articles SET title = '?' where id = '?';
      // bindParam pour title tous les champs concernés
      // Ensuite on exécute la requête.
      await artInstance.update(
        {
          title: title,
          metaDescription: metaDescription,
          category_id: category_id,
          body: body,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({ msg: 'Article updated' });
    } catch (e) {
      res.status(400).send('Server Error');
    }
  }
);

/**
 * @route POST api/articles/destroy
 * @body json
 */
router.delete(
  '/destroy',
  [auth, [check('id', 'Id doit etre un  nombre').trim().escape().isInt()]],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.body;
      const artInstance = Article();
      await artInstance.destroy({ where: { id: id } });

      res.status(200).json({ msg: 'Bye Bye article !!' });
    } catch (e) {
      res.status(400).send('Server Error');
    }
  }
);

export default router;
