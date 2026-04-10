const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: "mysql",
    logging: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
    dialectOptions: {
      ssl: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
      },
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require("./product.model.js")(sequelize, Sequelize);
db.User = require("./user.model.js")(sequelize, Sequelize);
db.AuthToken = require("./authToken.model.js")(sequelize, Sequelize);

module.exports = db;
