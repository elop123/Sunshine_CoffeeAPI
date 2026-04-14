module.exports = (sequalize, Sequelize) => {
  const AuthToken = sequalize.define("AuthToken", {
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
    },
    email: {
      type: Sequelize.STRING,
    },
      expiryDate: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    },
    {
      tableName: "authtokens",
      timestamps: true,
    },                              
    {
      tableName: "authtokens",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  });
  return AuthToken;
};
