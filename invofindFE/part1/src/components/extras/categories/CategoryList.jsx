import React, { useState } from "react";
import Category from "./Category";
import AddCategoryForm from "./AddCategoryForm";
import categoryService from "../../../services/categories";

const CategoryList = ({ categories, user, fetchData, checkLoginStatus }) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const showCategories = () => {
    return (
      <div className="allDeptCat">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={index}>
                <Category
                  user={user}
                  category={cat}
                  deleteCategory={deleteCategory}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <AddCategoryForm createCategory={addCategory} />
      </div>
    );
  };

  const addCategory = (category) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      categoryService
        .create({
          ...category,
          storeLocation: user.storeLocation,
        })
        .then((returnedCategory) => {
          fetchData();
          setNewCategoryName("");
        });
    }
  };

  const deleteCategory = async (catId) => {
    // Check login status or perform any other necessary checks
    await categoryService.remove(catId);
    fetchData();
  };

  return showCategories();
};

export default CategoryList;
