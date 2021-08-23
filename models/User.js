import pkg from 'sequelize';
import getConnexion from './getConnexion.js';
const { DataTypes } = pkg;
import Role from './Role.js';

export default function User() {
  const sequelize = getConnexion();
  try {
    const User = sequelize.define(
      'User',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: true,
          unicode: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unicode: true,
          unique: true,
        },
        avatar: {
          type: DataTypes.TEXT('long'),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role_id: {
          type: DataTypes.INTEGER,
          references: {
            model: Role(),
            key: 'id',
          },
        },
      },
      {
        tableName: 'users',
      }
    );

    // Cette ligne sert à dire à Sequelize comment récupérer les rôles avec les utilisateurs
    // User.associate = models => {
    //   User.belongsTo(models.role, { foreignKey: 'role_id', as: 'Role' });
    // };
    User.belongsTo(Role(), { foreignKey: 'role_id' });

    User.sync()
      .then(() => console.log('synced !'))
      .catch(e => console.log(e));
    console.log(User);
    return User;
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}
