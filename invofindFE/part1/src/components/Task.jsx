import React from "react";

const Task = ({ task, markResolved, user, deleteTask }) => {
  const renderDelete = () => {
    return (
      <td className="text-center">
        <button
          className="text-white p-1.5 cursor-pointer ml-8 mr-6 border-2 border-transparent hover:border-[#a0d2eb]"
          style={{ backgroundColor: "#8458b3" }}
          onClick={() => deleteTask(task)}
        >
          Delete
        </button>
      </td>
    );
  };

  return (
    <React.Fragment>
      <td>{task.item ? task.item.name : null}</td>
      <td>
        <button
          className="text-white p-1.5 cursor-pointer ml-8 border-2 border-transparent"
          style={{
            backgroundColor: task.resolved ? "#4CAF50" : "#f44336",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => markResolved(task)}
        >
          {task.resolved ? "Make Unresolved" : "Mark Resolved"}
        </button>
      </td>
      {user.admin && renderDelete()}
    </React.Fragment>
  );
};

export default Task;
