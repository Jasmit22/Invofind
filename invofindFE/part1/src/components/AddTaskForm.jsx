import PropTypes from "prop-types";
import { useState } from "react";

const AddTaskForm = ({ createTask }) => {
  const [content, setContent] = useState("");

  const addTask = (event) => {
    event.preventDefault();
    createTask({
      content: content,
      resolved: false,
    });

    setContent("");
  };

  return (
    <div>
      <h2>Add a Task</h2>
      <form onSubmit={addTask}>
        <div>
          Content
          <input
            value={content}
            onChange={(event) => setContent(event.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button className="submitButton" type="submit">
          Submit
        </button>
        <br></br>
      </form>
    </div>
  );
};

AddTaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
