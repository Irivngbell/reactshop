import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import dbconnexion from './db/index.js';
import usersRoutes from './routes/api/users.js';
import authRoutes from './routes/api/auth.js';
import categoriesRoutes from './routes/api/categories.js';
import articlesRoutes from './routes/api/articles.js';
import rolesRoutes from './routes/api/roles.js';
import stepsRoutes from './routes/api/reduxsteps.js';
import productsRoutes from './routes/api/products.js';
import cartRoutes from './routes/api/cart.js';

dbconnexion().then(() => console.log('DB connected 🎆 ❇ 🎇 ✨'));

const port = process.env.PORT || 5000;

app.set('query parser', 'simple'); // Ne parse les query string qu'en string, pas en objets ou autre format de données.
app.use(express.json({ limit: '5mb', extended: false }));
//
app.get('/', (req, res) => res.send('API running'));

app.use('/blog/steps', stepsRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

app.listen(port, () => {
  console.log(`Api listening at http://localhost:${port} 🎆 🔥 😎 💩`);
});
