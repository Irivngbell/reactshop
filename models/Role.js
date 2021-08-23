import pkg from 'sequelize';
import getConnexion from './getConnexion.js';
import User from './User.js';
const { DataTypes } = pkg;

export default function Role() {
  const sequelize = getConnexion();
  try {
    const Role = sequelize.define(
      'Role',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: true,
          unicode: true,
          unique: true,
        },
      },
      {
        tableName: 'roles',
      }
    );

    // Role.associate = models => {
    //   Role.hasMany(models.user, { foreignKey: 'role_id', as: 'User' });
    // };
    // Role.hasMany(User(), { foreignKey: 'role_id' });

    Role.sync()
      .then(() => console.log('synced !'))
      .catch(e => console.log(e));

    return Role;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}
