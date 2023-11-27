import PropTypes from "prop-types";
import { useState } from "react";

const AddItemForm = ({ createItem, departments }) => {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    if (content) {
      createItem({
        // content: content,
        // department: selectedDepartment,
        // resolved: false,
      });

      setContent("");
      setSelectedDepartment(""); // Reset the department selection
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold pb-3">Add an Item</h2>
      <form onSubmit={addItem} className="form-grid">
        <div className="form-row">
          <label className="form-label">Item Name:</label>
          <input
            className="form-input"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Price:</label>
          <input
            className="form-input"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Quantity:</label>
          <input
            className="form-input"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="itemSelect" className="form-label">
            Choose a Department:
          </label>
          <select
            className="form-input"
            id="itemSelect"
            name="items"
            value={selectedDepartment}
            onChange={(event) => setSelectedDepartment(event.target.value)}
          >
            {departments.map((department, index) => (
              <option key={index} value={department.deptName}>
                {department.deptName}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button
        className="bg-[#a0d2eb] text-[#373b4c] mb-4"
        type="submit"
        onClick={addItem}
      >
        Submit
      </button>
    </div>
  );
};

AddItemForm.propTypes = {
  createItem: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
};

export default AddItemForm;
