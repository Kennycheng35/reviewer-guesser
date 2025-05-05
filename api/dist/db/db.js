import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false,
});
sequelize.authenticate()
    .then(() => console.log('Postgres connection successful'))
    .catch((error) => console.error('Postgres unable to connect to the database:', error));
export default sequelize;
