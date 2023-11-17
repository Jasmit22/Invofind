import React from "react";
import "../Task.css";

const Task = ({ task, markResolved, user, deleteTask }) => {
  const renderDelete = () => {
    return (
      <td className="text-center">
        <button
          className={"deleteButton"}
          onClick={() => {
            deleteTask(task);
          }}
        >
          Delete
        </button>
      </td>
    );
  };

  return (
    <React.Fragment>
      <td className="text-center">
        <button
          className={"resolveButton"}
          style={{
            backgroundColor: task.resolved ? "#4CAF50" : "#f44336",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => {
            markResolved(task);
          }}
        >
          {task.resolved ? "Make Unresolved" : "Mark Resolved"}
        </button>
      </td>
      {user.admin && renderDelete()}
    </React.Fragment>
  );
};

export default Task;
