const { connect } = require("./connectDB");
const Todo = require("./todoModel");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Java script",
      dueDate: new Date(),
      completed: false,
    });
    console.log(`Created with todo id: ${todo.id}`);
  } catch (error) {
    console.error(error);
  }
};

const countItems = async () => {
  try {
    const totalCount = await Todo.count();
    console.log(`There are ${totalCount} items in the Table`);
  } catch (error) {
    console.error(error);
  }
};

const retrieveSingleRecord = async () => {
  try {
    const findOne = await Todo.findOne({
      where: {
        completed: false,
      },
      order: [["id", "DESC"]],
    });
    console.log(findOne.displayableString());
  } catch (error) {
    console.error(error);
  }
};

const retrieveRecords = async () => {
  try {
    const findAll = await Todo.findAll();
    const todoList = findAll.map((todo) => todo.displayableString()).join("\n");
    console.log(todoList);
  } catch (error) {
    console.error(error);
  }
};

const updateItems = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const deleteItems = async (id) => {
  try {
    const deleteRowCount = await Todo.destroy({
      where: {
        id: id,
      },
    });
    console.log(`Deleted ${deleteRowCount} rows`);
  } catch (error) {
    console.error(error);
  }
};

// (async () => {
//   //   await createTodo();
//   //   //   await countItems();
//   //   await retrieveSingleRecord();
//   //   await retrieveRecords();
//   //   await updateItems(2);
//   //   await retrieveRecords();
//   //   await deleteItems(2);
//   await retrieveRecords();
//   await createTodo();
//   await retrieveRecords();
// })();

(async () => {
  await retrieveRecords();
  await countItems();
})();
