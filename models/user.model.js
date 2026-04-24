module.exports = (sequalize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
         unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
     {
      tableName: "users",
      underscored: false,
      timestamps: false
    }
  );
  return User;
};
