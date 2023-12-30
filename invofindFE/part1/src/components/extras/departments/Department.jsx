import React from "react";

const Department = ({ department, user, deleteDepartment }) => {
  const renderDelete = () => {
    return (
      <td className="text-center">
        <button
          className="text-white p-1.5 cursor-pointer ml-8 mr-6 border-2 border-transparent hover:border-[#a0d2eb]"
          style={{ backgroundColor: "#8458b3" }}
          onClick={() => {
            deleteDepartment(department.id);
          }}
        >
          Delete
        </button>
      </td>
    );
  };

  return (
    <React.Fragment>
      <td>• {department.deptName}</td>
      {user.admin && renderDelete()}
    </React.Fragment>
  );
};

export default Department;
