import pkg from 'sequelize';
const { DataTypes } = pkg;
import getConnexion from './getConnexion.js';
import Category from './Category.js';

export default function Order() {
  const sequelize = getConnexion();
  try {
    const Order = sequelize.define(
      'Order',
      {
        items: {
          type: DataTypes.TEXT('medium'),
        },
        priceHT: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        priceTTC: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        tableName: 'orders',
      }
    );

    Order.sync()
      .then(() => console.log('synced !'))
      .catch(e => console.log(e));

    return Order;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}
