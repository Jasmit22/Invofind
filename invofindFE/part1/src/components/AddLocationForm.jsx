import PropTypes from "prop-types";
import { useState } from "react";

const AddLocationForm = ({ createLocation, user }) => {
  const [locationType, setLocationType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (locationType) {
      createLocation({
        type: locationType,
        storeLocation: user.storeLocation,
      });
      setLocationType("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold pb-3">Add a Location</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <label className="form-label">Location Type:</label>
          <input
            className="form-input"
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            placeholder="Enter location type"
          />
        </div>

        <div className="form-row">
          <div>
            <button className="bg-[#a0d2eb] text-[#373b4c] mb-4" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddLocationForm.propTypes = {
  createLocation: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default AddLocationForm;
