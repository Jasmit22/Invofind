import React from "react";

const Location = ({ location, user, deleteLocation, toProperCase }) => {
  const renderDelete = () => {
    return (
      <td className="text-center">
        <button
          className="text-white p-1.5 cursor-pointer ml-8 mr-6 border-2 border-transparent bg-[#f44336]"
          onClick={() => deleteLocation(location)}
        >
          Delete
        </button>
      </td>
    );
  };

  return (
    <React.Fragment>
      <td>{location.item ? location.item.name.toProperCase() : null}</td>
      {user.admin && renderDelete()}
    </React.Fragment>
  );
};

export default Location;
