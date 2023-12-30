import PropTypes from "prop-types";
import { useState } from "react";

const AddIssueForm = ({ createIssue }) => {
  const [description, setDescription] = useState("");

  const addIssue = (event) => {
    event.preventDefault();
    if (description) {
      createIssue({
        description: description,
        resolved: false,
      });
      setDescription("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold pb-3">Add an Issue</h2>
      <form onSubmit={addIssue}>
        <div>
          Description
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button className="bg-[#a0d2eb] text-[#373b4c] mb-4" type="submit">
          Submit
        </button>
        <br></br>
      </form>
    </div>
  );
};

AddIssueForm.propTypes = {
  createIssue: PropTypes.func.isRequired,
};

export default AddIssueForm;
