import React, { useState } from "react";
import Department from "./Department";
import AddDepartmentForm from "./AddDepartmentForm";
import departmentService from "../../../services/departments";

const DepartmentList = ({ departments, user, fetchData, checkLoginStatus }) => {
  const [newDepartmentName, setNewDepartmentName] = useState("");

  const showDepartments = () => {
    return (
      <div className="allDeptCat">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={index}>
                <Department
                  user={user}
                  department={dept}
                  deleteDepartment={deleteDepartment}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <AddDepartmentForm createDepartment={addDepartment} />
      </div>
    );
  };

  const addDepartment = (department) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      departmentService
        .create({ ...department, storeLocation: user.storeLocation })
        .then((returnedDepartment) => {
          fetchData();
          setNewDepartmentName("");
        });
    }
  };

  const deleteDepartment = async (deptId) => {
    // Implement deletion logic
    await departmentService.remove(deptId);
    fetchData(); // Refresh the departments list
  };

  return showDepartments();
};

export default DepartmentList;
