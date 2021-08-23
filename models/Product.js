import pkg from 'sequelize';
const { DataTypes } = pkg;
import getConnexion from './getConnexion.js';
import Category from './Category.js';

export default function Product() {
  const sequelize = getConnexion();
  try {
    const Product = sequelize.define(
      'Product',
      {
        category_id: {
          type: DataTypes.INTEGER,
          references: {
            model: Category(),
            key: 'id',
          },
        },
        ref: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
        },
        attr: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        image: {
          type: DataTypes.TEXT('long'),
          allowNull: false,
        },
        metaDescription: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT('long'),
          allowNull: false,
        },
        excerpt: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        priceHT: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'products',
      }
    );

    Product.sync()
      .then(() => console.log('synced !'))
      .catch(e => console.log(e));

    return Product;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}
