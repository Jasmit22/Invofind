import React from "react";

const Item = ({ item, user, deleteItem, add, subtract }) => {
  const renderDelete = () => {
    return (
      <td className="text-center">
        <button
          className="text-white p-1.5 cursor-pointer ml-8 mr-6 border-2 border-transparent hover:border-[#a0d2eb]"
          style={{ backgroundColor: "#8458b3" }}
          onClick={() => deleteItem(item)}
        >
          Delete
        </button>
      </td>
    );
  };

  return (
    <React.Fragment>
      <td className="text-center">
        <button
          className="text-white p-1.5 cursor-pointer ml-8 border-2 border-transparent bg-[#4CAF50]"
          onClick={() => add(item)}
        >
          Add 1
        </button>
      </td>
      <td className="text-center">
        <button
          className="text-white p-1.5 cursor-pointer ml-8 border-2 border-transparent bg-[#f44336]"
          onClick={() => subtract(item)}
        >
          Subtract 1
        </button>
      </td>
      {user.admin && renderDelete()}
    </React.Fragment>
  );
};

export default Item;
