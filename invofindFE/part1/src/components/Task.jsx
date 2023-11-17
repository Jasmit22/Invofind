import React from "react";
import "../Task.css";

const Task = ({ task, markResolved, user, deleteTask }) => {
  const renderDelete = () => {
    return (
      <button
        className={"deleteButton"}
        onClick={() => {
          deleteTask(task);
        }}
      >
        Delete
      </button>
    );
  };

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div className={"taskContainer"}>
      <h4 className="text-lg">{task.content.toProperCase()}</h4>
      <button
        className={"resolveButton"}
        style={{
          backgroundColor: task.resolved ? "#4CAF50" : "#f44336",
          transition: "background-color 0.3s ease", // Add transition effect
        }}
        onClick={() => {
          markResolved(task);
        }}
      >
        {task.resolved ? "Make Unresolved" : "Mark Resolved"}
      </button>
      {user.admin && renderDelete()}
    </div>
  );
};

export default Task;
