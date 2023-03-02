const Sequelize = require("sequelize");

const database = "todo_database";
const username = "postgres";
const password = "H@rish9843";
const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const connect = async () => {
  return sequelize.authenticate();
};

module.exports = {
  connect,
  sequelize,
};
