import PropTypes from "prop-types";
import { useState } from "react";

const AddDepartmentForm = ({ createDepartment }) => {
  const [newDepartmentName, setNewDepartmentName] = useState("");

  const addDepartment = (event) => {
    event.preventDefault();
    if (newDepartmentName) {
      createDepartment({
        deptName: newDepartmentName,
      });
      setNewDepartmentName("");
    }
  };

  return (
    <div className="mt-4">
      <input
        value={newDepartmentName}
        onChange={(e) => setNewDepartmentName(e.target.value)}
        placeholder="New Department"
        className="mr-10 w-50"
      />
      <button onClick={addDepartment} className="bg-[#a0d2eb] text-[#31343f]">
        Add
      </button>
    </div>
  );
};

AddDepartmentForm.propTypes = {
  createDepartment: PropTypes.func.isRequired,
};

export default AddDepartmentForm;
