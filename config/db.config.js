// Config file - change this to fit your DB
module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT || 4000,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
