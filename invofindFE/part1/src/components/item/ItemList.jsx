import React, { useState } from "react";
import Item from "./Item";
import Togglable from "../Togglable";
import AddItemForm from "./AddItemForm";

const ItemList = ({
  items,
  user,
  fetchData,
  departments,
  categories,
  locations,
  checkLoginStatus,
  itemService,
  setItemToDelete,
  setIsDeleteItemModalOpen,
}) => {
  const [newItemFilter, setNewItemFilter] = useState("");

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const renderAddItem = () => {
    return (
      <div className="addItem">
        <Togglable buttonLabel="Add Item">
          <AddItemForm
            createItem={addItem}
            departments={departments}
            categories={categories}
            locations={locations}
          />
        </Togglable>
      </div>
    );
  };

  const addItem = (item) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      if (
        item.name !== null &&
        item.price !== null &&
        item.quantity !== null &&
        item.department !== null
      ) {
        itemService.create(item).then((returnedItem) => {
          fetchData();
        });
      }
    }
  };

  const showItems = () => {
    return (
      <div className="allItems">
        {user !== null && renderAddItem()}
        <input
          className="filterItems mb-6"
          onChange={(event) => setNewItemFilter(event.target.value)}
          value={newItemFilter}
          placeholder={"Filter Items"}
        />
        <div className="flex justify-center w-full">
          <table className="w-full">
            <tbody>
              <tr>
                <td>
                  <b>Name</b>
                </td>
                <td>
                  <b>Price</b>
                </td>
                <td>
                  <b>Quantity</b>
                </td>
                <td>
                  <b>Department</b>
                </td>
                <td>
                  <b>Category</b>
                </td>
                <td>
                  <b>Location</b>
                </td>
              </tr>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name.toProperCase()}</td>
                  <td>${item.price.toProperCase()}</td>
                  <td>{item.quantity}</td>
                  <td>{item.department.deptName}</td>
                  <td>{item.category.name}</td>
                  <td>{item.location.type}</td>
                  <Item
                    item={item}
                    user={user}
                    deleteItem={deleteItem}
                    add={addQuantity}
                    subtract={subtractQuantity}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const addQuantity = async (item) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      const newItem = { ...item };
      newItem.quantity = item.quantity + 1;

      await itemService.update(item.id, newItem);

      fetchData();
    }
  };

  const subtractQuantity = async (item) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      const newItem = { ...item };
      newItem.quantity = item.quantity - 1;

      await itemService.update(item.id, newItem);

      fetchData();
    }
  };

  const filteredItems = items.filter((item) => {
    return item.name.toUpperCase().includes(newItemFilter.toUpperCase());
  });

  const deleteItem = (item) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      handleDeleteItemClick(item);
    }
  };

  const handleDeleteItemClick = (item) => {
    setItemToDelete(item);
    setIsDeleteItemModalOpen(true);
  };

  return showItems();
};

export default ItemList;
