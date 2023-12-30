import React, { useState, useEffect } from "react";
import Task from "./Task";
import Togglable from "../Togglable";
import AddTaskForm from "./AddTaskForm";

const TaskList = ({
  tasks,
  user,
  items,
  fetchData,
  checkLoginStatus,
  taskService,
  setIsDeleteTaskModalOpen,
  setTaskToDelete,
}) => {
  const [newTaskFilter, setNewTaskFilter] = useState("");

  const filteredTasks = tasks.filter((task) => {
    return task.content.toUpperCase().includes(newTaskFilter.toUpperCase());
  });

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const markTaskResolved = async (task) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      const newTask = { ...task };
      newTask.resolved = !task.resolved;

      await taskService.update(task.id, newTask);

      fetchData();
    }
  };

  const addTask = (task) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      if (task.content !== null) {
        taskService.create(task).then((returnedTask) => {
          fetchData();
        });
      }
    }
  };

  const deleteTask = (task) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      setTaskToDelete(task);
      setIsDeleteTaskModalOpen(true);
    }
  };

  const renderAddTask = () => {
    return (
      <div className="addTask">
        <Togglable buttonLabel="Add Task">
          <AddTaskForm createTask={addTask} items={items} />
        </Togglable>
      </div>
    );
  };

  return (
    <div className="allItems">
      {user !== null && user.admin && renderAddTask()}
      <input
        className="filterItems mb-6"
        onChange={(event) => setNewTaskFilter(event.target.value)}
        value={newTaskFilter}
        placeholder={"Filter Tasks"}
      />
      <div className="flex justify-center w-full">
        <table className="w-full">
          <tbody>
            <tr className="">
              <td>
                <b>Task Description</b>
              </td>
              <td>
                <b>Associated Item</b>
              </td>
            </tr>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.content.toProperCase()}</td>
                <Task
                  task={task}
                  markResolved={markTaskResolved}
                  user={user}
                  deleteTask={deleteTask}
                  toProperCase={String.prototype.toProperCase}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
