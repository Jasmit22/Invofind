import React from "react";

const Category = ({ category, user, deleteCategory }) => {
  const renderDelete = () => {
    return (
      <td className="text-center">
        <button
          className="text-white p-1.5 cursor-pointer ml-8 mr-6 border-2 border-transparent hover:border-[#a0d2eb]"
          style={{ backgroundColor: "#8458b3" }}
          onClick={() => {
            deleteCategory(category.id);
          }}
        >
          Delete
        </button>
      </td>
    );
  };

  // {user && user.admin && (
  //   <td>
  //     <button
  //       className="bg-[#f44336]"
  //       onClick={() => deleteCategory(cat.id)}
  //     >
  //       Delete
  //     </button>
  //   </td>

  return (
    <React.Fragment>
      <td>• {category.name}</td>
      {user.admin && renderDelete()}
    </React.Fragment>
  );
};

export default Category;
