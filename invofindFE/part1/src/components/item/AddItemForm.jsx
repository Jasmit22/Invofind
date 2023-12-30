import PropTypes from "prop-types";
import { useState } from "react";

const AddItemForm = ({ createItem, departments, categories, locations }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    if (
      name &&
      selectedDepartment &&
      selectedCategory &&
      selectedLocation &&
      price &&
      quantity
    ) {
      const departmentObject = departments.find(
        (dept) => dept.deptName === selectedDepartment
      );
      const categoryObject = categories.find(
        (cat) => cat.name === selectedCategory
      );
      const locationObject = locations.find(
        (loc) => loc.type === selectedLocation
      );

      createItem({
        name: name,
        price: price,
        quantity: quantity,
        departmentId: departmentObject.id,
        categoryId: categoryObject.id,
        locationId: locationObject.id,
      });

      setName("");
      setPrice("");
      setQuantity("");
      setSelectedDepartment("");
      setSelectedCategory("");
      setSelectedLocation("");
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
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Price:</label>
          <input
            className="form-input"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Quantity:</label>
          <input
            className="form-input"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="departmentSelect" className="form-label">
            Choose a Department:
          </label>
          <select
            className="form-input"
            id="departmentSelect"
            name="departments"
            value={selectedDepartment}
            onChange={(event) => setSelectedDepartment(event.target.value)}
          >
            <option value="">Select...</option>
            {departments.map((department, index) => (
              <option key={index} value={department.deptName}>
                {department.deptName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="categorySelect" className="form-label">
            Choose a Category:
          </label>
          <select
            className="form-input"
            id="categorySelect"
            name="categories"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">Select...</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="locationSelect" className="form-label">
            Choose a Location:
          </label>
          <select
            className="form-input"
            id="locationSelect"
            name="locations"
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
          >
            <option value="">Select...</option>
            {locations.map((location, index) => (
              <option key={index} value={location.type}>
                {location.type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="button-wrapper">
            <button
              className="bg-[#a0d2eb] text-[#373b4c] mb-4"
              type="submit"
              onClick={addItem}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddItemForm.propTypes = {
  createItem: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default AddItemForm;
