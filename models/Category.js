import pkg from 'sequelize';
import getConnexion from './getConnexion.js';
const { DataTypes } = pkg;

export default function Category() {
  const sequelize = getConnexion();
  try {
    const Category = sequelize.define(
      'Category',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        tableName: 'categories',
      }
    );

    Category.sync()
      .then(() => console.log('synced !'))
      .catch(e => console.log(e));

    return Category;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}
