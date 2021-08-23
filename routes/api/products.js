import express from 'express';
const router = express.Router();
import { check, query, validationResult } from 'express-validator';
import auth from '../../middleware/auth.js';
import Product from '../../models/Product.js';
import Category from '../../models/Category.js';

/**
 * @route GET /api/articles
 */
router.get('/', async function (req, res) {
  //

  try {
    let productInstance = Product();

    const products = await productInstance.findAll();

    res.status(200).json(products);
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
      const {
        category_id,
        title,
        metaDescription,
        image,
        description,
        priceHT,
      } = req.body;

      const catInstance = Category();

      const cat = await catInstance.findOne({
        where: {
          id: category_id,
        },
      });
      let productInstance = Product();

      const product = await productInstance.create({
        category_id: cat.id,
        title: title,
        metaDescription: metaDescription,
        priceHT: priceHT,
        image: image,
        description: description,
      });

      res.status(200).json({ product, msg: 'Article cree' });
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

    const {
      id,
      metaDescription,
      category_id,
      title,
      description,
      priceHT,
      image,
    } = req.body;

    try {
      const prodInstance = Product();

      // update articles SET title = '?' where id = '?';
      // bindParam pour title tous les champs concernés
      // Ensuite on exécute la requête.
      await prodInstance.update(
        {
          title: title,
          metaDescription: metaDescription,
          category_id: category_id,
          description: description,
          priceHT: priceHT,
          image: image,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({ msg: 'Product updated' });
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
      const prodInstance = Product();
      await prodInstance.destroy({ where: { id: id } });

      res.status(200).json({ msg: 'Bye Bye product !!' });
    } catch (e) {
      res.status(400).send('Server Error');
    }
  }
);

export default router;
