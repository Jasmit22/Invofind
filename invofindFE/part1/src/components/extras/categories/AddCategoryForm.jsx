import PropTypes from "prop-types";
import { useState } from "react";

const AddCategoryForm = ({ createCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const addCategory = (event) => {
    event.preventDefault();
    if (newCategoryName) {
      createCategory({
        name: newCategoryName,
      });
      setNewCategoryName("");
    }
  };

  return (
    <div className="mt-4">
      <input
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="New Category"
        className="mr-10 w-50"
      />
      <button onClick={addCategory} className="bg-[#a0d2eb] text-[#31343f]">
        Add
      </button>
    </div>
  );
};

AddCategoryForm.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

export default AddCategoryForm;
