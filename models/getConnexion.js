import pkg from 'sequelize';
const { Sequelize } = pkg;

export default function getConnexion() {
    return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_ENV,
            logging: false,
        }
    );
}
