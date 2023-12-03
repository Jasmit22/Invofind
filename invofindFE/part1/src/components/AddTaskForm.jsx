import PropTypes from "prop-types";
import { useState } from "react";

const AddTaskForm = ({ createTask, items }) => {
  const [content, setContent] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const addTask = (event) => {
    event.preventDefault();
    // Check if content is not empty and an item is selected
    if (content && (selectedItem || selectedItem === "none")) {
      createTask({
        content: content,
        resolved: false,
        itemId: selectedItem === "none" ? null : selectedItem, // Set itemId to null if "No item" is selected
      });

      // Reset form fields
      setContent("");
      setSelectedItem("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold pb-3">Add a Task</h2>
      <form onSubmit={addTask} className="form-grid">
        <div className="form-row">
          <label className="form-label">Content:</label>
          <input
            className="form-input"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="itemSelect" className="form-label">
            Choose an Item:
          </label>
          <select
            className="form-input"
            id="itemSelect"
            name="items"
            value={selectedItem}
            onChange={(event) => setSelectedItem(event.target.value)}
          >
            <option value="">Select Item...</option> {/* Default option */}
            <option value="none">No item</option> {/* "No item" option */}
            {items.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="button-wrapper">
            <button className="bg-[#a0d2eb] text-[#373b4c] mb-4" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddTaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default AddTaskForm;
