"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodo() {
      return this.findAll();
    }

    static overdueTodo() {
      return this.findAll({
        where: {
          dueDate: { [Op.lt]: new Date() },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static duetodayTodo() {
      return this.findAll({
        where: {
          dueDate: { [Op.eq]: new Date() },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static duelaterTodo() {
      return this.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    deleteTodo({ todo }) {
      return this.destroy({
        where: {
          id: todo,
        },
      });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
