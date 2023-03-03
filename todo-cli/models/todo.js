"use strict";
const { Model, where } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      await Todo.overdue();
      console.log("\n");

      console.log("Due Today");
      await Todo.dueToday();
      console.log("\n");

      console.log("Due Later");
      await Todo.dueLater();
    }

    static async overdue() {
      const overdueRetreive = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
        },
      });
      const overdueItems = overdueRetreive
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(overdueItems);
    }
    static async dueToday() {
      const dueTodayRetreive = await Todo.findAll({
        where: {
          dueDate: {
            [Op.et]: new Date(),
          },
        },
      });
      const dueTodayItems = dueTodayRetreive
        .map((todo) => todo.displayableStringToday())
        .join("\n");
      console.log(dueTodayItems);
    }

    static async dueLater() {
      const duelaterRetreive = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
      });
      const duelaterItems = duelaterRetreive
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(duelaterItems);
    }

    static async markAsComplete(id) {
      await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
    displayableStringToday() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title}`;
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
