const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: "mysql",
    logging: false,
    pool: dbConfig.pool,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require("../models/product.model.js")(sequelize, Sequelize);
db.User = require("../models/user.model.js")(sequelize, Sequelize);
db.AuthToken = require("../models/authToken.model.js")(sequelize, Sequelize);

module.exports = db;
