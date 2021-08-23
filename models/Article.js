import pkg from 'sequelize';
const { DataTypes, Sequelize } = pkg;
import getConnexion from './getConnexion.js';
import Category from './Category.js';
import User from './User.js';

export default function Article() {
  const sequelize = getConnexion();
  try {
    const Article = sequelize.define(
      'Article',
      {
        category_id: {
          type: DataTypes.INTEGER,
          references: {
            model: Category(),
            key: 'id',
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: User(),
            key: 'id',
          },
        },
        metaDescription: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        body: {
          type: DataTypes.TEXT('long'),
          allowNull: false,
        },
        excerpt: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: 'articles',
      }
    );

    Article.sync()
      .then(() => console.log('synced !'))
      .catch(e => console.log(e));

    return Article;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}
