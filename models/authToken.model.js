module.exports = (sequelize, Sequelize) => {
  const AuthToken = sequelize.define(
    "AuthToken",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      expiryDate: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "authtokens",
      timestamps: false,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  return AuthToken;
};
