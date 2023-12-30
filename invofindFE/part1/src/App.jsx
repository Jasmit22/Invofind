import { useState, useEffect } from "react";
import Togglable from "./components/Togglable";
import LoginForm from "./components/user/LoginForm";
import loginService from "./services/login";
import taskService from "./services/tasks";
import issueService from "./services/issues";
import storeService from "./services/stores";
import itemService from "./services/items";
import employeeService from "./services/employees";
import departmentService from "./services/departments";
import categoryService from "./services/categories";
import locationService from "./services/locations";
import Issue from "./components/issue/Issue";
import Item from "./components/item/Item";
import Location from "./components/location/Location";
import AddIssueForm from "./components/issue/AddIssueForm";
import AddItemForm from "./components/item/AddItemForm";
import AddLocationForm from "./components/location/AddLocationForm";
import ConfirmModal from "./components/ConfirmModal";
import AddUserModal from "./components/user/AddUserModal";
import TaskList from "./components/task/TaskList";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newIssueFilter, setNewIssueFilter] = useState("");
  const [newTaskFilter, setNewTaskFilter] = useState("");
  const [newItemFilter, setNewItemFilter] = useState("");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [isDeleteIssueModalOpen, setIsDeleteIssueModalOpen] = useState(false);
  const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isDeleteLocationModalOpen, setIsDeleteLocationModalOpen] =
    useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [issueToDelete, setIssueToDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [items, setItems] = useState([]);
  const [issues, setIssues] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newLocationFilter, setNewLocationFilter] = useState("");
  const [locations, setLocations] = useState([]);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    window.localStorage.removeItem("loggedAppUser");
    setUser(null);
    setIsLogoutModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsLogoutModalOpen(false);
    setIsDeleteTaskModalOpen(false);
    setIsDeleteIssueModalOpen(false);
    setIsDeleteItemModalOpen(false);
    setIsAddUserModalOpen(false);
    setTaskToDelete(null);
    setIssueToDelete(null);
    setItemToDelete(null);
  };

  const handleDeleteTaskClick = (task) => {
    setTaskToDelete(task);
    setIsDeleteTaskModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      try {
        await taskService.remove(taskToDelete.id);
        fetchData();
      } catch (error) {
        console.error("Error deleting the task:", error);
      }
    }
    setIsDeleteTaskModalOpen(false);
    setTaskToDelete(null);

    if (issueToDelete) {
      try {
        await issueService.remove(issueToDelete.id);
        fetchData();
      } catch (error) {
        console.error("Error deleting the issue:", error);
      }
    }
    setIsDeleteIssueModalOpen(false);
    setIssueToDelete(null);

    if (itemToDelete) {
      try {
        await itemService.remove(itemToDelete.id);
        fetchData();
      } catch (error) {
        console.error("Error deleting the item:", error);
      }
    }
    setIsDeleteItemModalOpen(false);
    setItemToDelete(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      taskService.setToken(user.token);
      issueService.setToken(user.token);
      storeService.setToken(user.token);
      itemService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const invofindHeading = document.querySelector(".invofindHeading");
    if (invofindHeading) {
      invofindHeading.innerHTML = invofindHeading.innerText
        .split("")
        .map(
          (letters, i) =>
            `<span style = "transition-delay:${i * 30}ms;
          filter: hue-rotate(${i * 15}deg)"›$">${letters}</span>`
        )
        .join("");
    }
  }, []);

  const fetchData = () => {
    if (user) {
      Promise.all([
        taskService.getAll(),
        issueService.getAll(),
        storeService.getById(user.storeLocation),
        itemService.getAll(),
        locationService.getAll(),
      ]).then(([allTasks, allIssues, store, allItems, allLocations]) => {
        const userStoreLocation = user.storeLocation;

        // Fetch tasks for the user's store location
        const tasksForUserStore = allTasks.filter(
          (task) => task.employee.storeLocation === userStoreLocation
        );
        setTasks(tasksForUserStore);

        // Fetch issues for the user's store location
        const issuesForUserStore = allIssues.filter(
          (issue) => issue.employee.storeLocation === userStoreLocation
        );
        setIssues(issuesForUserStore);

        // Set departments and categories from the store
        setDepartments(store.departments);
        setCategories(store.categories);

        // Fetch items for the user's store location
        const itemsForUserStore = allItems.filter(
          (item) => item.department.storeLocation === userStoreLocation
        );
        setItems(itemsForUserStore);

        // Fetch locations for the user's store location
        const locationsForUserStore = allLocations.filter(
          (location) => location.storeLocation === userStoreLocation
        );
        setLocations(locationsForUserStore);
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const checkLoginStatus = () => {
    const decode = JSON.parse(atob(user.token.split(".")[1]));
    if (decode.exp * 1000 < new Date().getTime()) {
      window.localStorage.removeItem("loggedAppUser");
      setUser(null);
      setErrorMessage("Session Timed Out. Please Log In Again.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return true;
    }
    return false;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      taskService.setToken(user.token);
      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      console.log(exception);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    return issue.description
      .toUpperCase()
      .includes(newIssueFilter.toUpperCase());
  });

  const showIssues = () => {
    return (
      <div className="allItems">
        {user !== null && renderAddIssue()}
        <input
          className="filterItems mb-6"
          onChange={(event) => setNewIssueFilter(event.target.value)}
          value={newIssueFilter}
          placeholder={"Filter Issues"}
        />
        <div className="flex justify-center w-full">
          <table className="w-full">
            <tbody>
              <tr>
                <td>
                  <b>Issue</b>
                </td>
              </tr>
              {filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  <td>{issue.description.toProperCase()}</td>
                  <Issue
                    issue={issue}
                    markResolved={markIssueResolved}
                    user={user}
                    deleteIssue={deleteIssue}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const markIssueResolved = async (issue) => {
    if (!checkLoginStatus()) {
      const newIssue = { ...issue };
      newIssue.resolved = !issue.resolved;

      await issueService.update(issue.id, newIssue);

      fetchData();
    }
  };

  const renderAddIssue = () => {
    return (
      <div className="addIssue">
        <Togglable buttonLabel="Add Issue">
          <AddIssueForm createIssue={addIssue} />
        </Togglable>
      </div>
    );
  };

  const addIssue = (issue) => {
    if (!checkLoginStatus()) {
      if (issue.description !== null) {
        issueService.create(issue).then((returnedIssue) => {
          setIssues(issues.concat(returnedIssue));
        });
      }
    }
  };

  const deleteIssue = (issue) => {
    if (!checkLoginStatus()) {
      handleDeleteIssueClick(issue);
    }
  };

  const handleDeleteIssueClick = (issue) => {
    setIssueToDelete(issue);
    setIsDeleteIssueModalOpen(true);
  };

  const renderLogin = () => {
    return (
      <div>
        <Togglable buttonLabel="Log In">
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
    );
  };

  const renderLogout = () => {
    return (
      <div className="mr-4">
        <button className="headerButtons" onClick={handleLogoutClick}>
          Log out
        </button>
      </div>
    );
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
    if (!checkLoginStatus()) {
      if (
        item.name !== null &&
        item.price !== null &&
        item.quantity !== null &&
        item.department !== null
      ) {
        itemService.create(item).then((returnedItem) => {
          fetchData(); // Need to do this, or else items don't get populated correctly.
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
    if (!checkLoginStatus()) {
      const newItem = { ...item };
      newItem.quantity = item.quantity + 1;

      await itemService.update(item.id, newItem);

      fetchData();
    }
  };

  const subtractQuantity = async (item) => {
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
    if (!checkLoginStatus()) {
      handleDeleteItemClick(item);
    }
  };

  const handleDeleteItemClick = (item) => {
    setItemToDelete(item);
    setIsDeleteItemModalOpen(true);
  };

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
                <td>• {dept.deptName}</td>
                {user && user.admin && (
                  <td>
                    <button
                      className="bg-[#f44336]"
                      onClick={() => deleteDepartment(dept.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {user.admin && (
          <div className="mt-4">
            <input
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              placeholder="New Department"
              className="mr-10 w-50"
            />
            <button
              onClick={addDepartment}
              className="bg-[#a0d2eb] text-[#31343f]"
            >
              Add
            </button>
          </div>
        )}
      </div>
    );
  };

  const addDepartment = () => {
    if (!checkLoginStatus()) {
      departmentService
        .create({
          deptName: newDepartmentName,
          storeLocation: user.storeLocation,
        })
        .then((returnedDepartment) => {
          setDepartments(departments.concat(returnedDepartment));
          setNewDepartmentName("");
        });
    }
  };

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
                <td>• {cat.name}</td>
                {user && user.admin && (
                  <td>
                    <button
                      className="bg-[#f44336]"
                      onClick={() => deleteCategory(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {user.admin && (
          <div className="mt-4">
            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New Category"
              className="mr-10 w-50"
            />
            <button
              onClick={addCategory}
              className="bg-[#a0d2eb] text-[#31343f]"
            >
              Add
            </button>
          </div>
        )}
      </div>
    );
  };

  const addCategory = () => {
    if (!checkLoginStatus()) {
      categoryService
        .create({
          name: newCategoryName,
          storeLocation: user.storeLocation,
        })
        .then((returnedCategory) => {
          setCategories(categories.concat(returnedCategory));
          setNewCategoryName("");
        });
    }
  };

  const deleteDepartment = async (deptId) => {
    // Implement deletion logic
    await departmentService.remove(deptId);
    fetchData(); // Refresh the departments list
  };

  const deleteCategory = async (catId) => {
    // Implement deletion logic
    await categoryService.remove(catId);
    fetchData(); // Refresh the categories list
  };

  function openInfo(evt, infoName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(infoName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  const showExtras = () => {
    return (
      <div className="">
        {showDepartments()}
        {showCategories()}
      </div>
    );
  };

  const renderAddLocation = () => {
    return (
      <div className="addLocation">
        <Togglable buttonLabel="Add Location">
          <AddLocationForm createLocation={addLocation} user={user} />
        </Togglable>
      </div>
    );
  };

  const addLocation = (location) => {
    if (!checkLoginStatus()) {
      locationService.create(location).then((returnedLocation) => {
        fetchData();
      });
    }
  };

  const deleteLocation = (location) => {
    setLocationToDelete(location);
    setIsDeleteLocationModalOpen(true);
  };

  const handleConfirmDeleteLocation = async () => {
    if (locationToDelete) {
      try {
        await locationService.remove(locationToDelete.id);
        fetchData();
      } catch (error) {
        console.error("Error deleting the location:", error);
      }
    }
    setIsDeleteLocationModalOpen(false);
    setLocationToDelete(null);
  };

  const filteredLocations = locations.filter((location) => {
    return location.type
      .toUpperCase()
      .includes(newLocationFilter.toUpperCase());
  });

  const showLocations = () => {
    return (
      <div className="allItems">
        {user !== null && user.admin && renderAddLocation()}
        <input
          className="filterLocations mb-6"
          onChange={(event) => setNewLocationFilter(event.target.value)}
          value={newLocationFilter}
          placeholder={"Filter Locations"}
        />
        <div className="flex justify-center w-full">
          <table className="w-full">
            <tbody>
              <tr>
                <td>
                  <b>Type</b>
                </td>
                <td>
                  <b>Items</b>
                </td>
              </tr>
              {filteredLocations.map((location) => (
                <tr key={location.id}>
                  <td>{location.type.toProperCase()}</td>
                  <td>{location.items.map((item) => item.name).join(", ")}</td>
                  <Location
                    location={location}
                    user={user}
                    deleteLocation={() => deleteLocation(location)}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const showSample = () => {
    return (
      <div className="mx-10">
        <div className="tab">
          <button
            className="tablinks"
            onClick={(event) => openInfo(event, "Info1")}
          >
            Tasks
          </button>
          <button
            className="tablinks"
            onClick={(event) => openInfo(event, "Info2")}
          >
            Items
          </button>
          <button
            className="tablinks"
            onClick={(event) => openInfo(event, "Info3")}
          >
            Issues
          </button>
          <button
            className="tablinks"
            onClick={(event) => openInfo(event, "Info4")}
          >
            Locations
          </button>
          <button
            className="tablinks"
            onClick={(event) => openInfo(event, "Extras")}
          >
            Extras
          </button>
        </div>

        <div id="Info1" className="tabcontent">
          <TaskList
            tasks={tasks}
            user={user}
            items={items}
            fetchData={fetchData}
            checkLoginStatus={checkLoginStatus}
            taskService={taskService}
            handleDeleteTaskClick={handleDeleteTaskClick}
          />
        </div>
        <div id="Info2" className="tabcontent">
          {showItems()}
        </div>
        <div id="Info3" className="tabcontent">
          {showIssues()}
        </div>
        <div id="Info4" className="tabcontent">
          {showLocations()}
        </div>
        <div id="Extras" className="tabcontent">
          {showExtras()}
        </div>
      </div>
    );
  };

  const renderAddUser = () => {
    return (
      <div className="mr-4">
        <button
          className="headerButtons"
          onClick={() => {
            setIsAddUserModalOpen(true);
          }}
        >
          Add Employee
        </button>
      </div>
    );
  };

  const handleAddUser = (username, firstName, lastName, password, admin) => {
    const storeLocation = user.storeLocation;
    employeeService.create({
      username,
      firstName,
      lastName,
      password,
      admin,
      storeLocation,
    });
    handleCloseModal();
  };

  return (
    <div className="w-screen">
      <div className="flex fixed z-100 top-0 w-full justify-between pl-3 h-15 items-center bg-[#31343f] border-solid border-[#a0d2eb] border-b">
        <div className="invofindHeading">InvoFind 🔍</div>
        <div className="flex">
          {user !== null && user.admin && renderAddUser()}
          {user !== null && renderLogout()}
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to log out?"
      />

      <ConfirmModal
        isOpen={isDeleteTaskModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this task?"
      />

      <ConfirmModal
        isOpen={isDeleteIssueModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this issue?"
      />

      <ConfirmModal
        isOpen={isDeleteItemModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this item?"
      />

      <ConfirmModal
        isOpen={isDeleteLocationModalOpen}
        onClose={() => setIsDeleteLocationModalOpen(false)}
        onConfirm={handleConfirmDeleteLocation}
        message="Are you sure you want to delete the location? All associated items will also be deleted."
      />

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddUser}
        message="Add an Employee"
      />

      {errorMessage && (
        <div className="error-overlay">
          <div className="error-message">{errorMessage.toProperCase()}</div>
        </div>
      )}

      <div className="content">
        {user === null && renderLogin()}
        {user !== null && showSample()}
      </div>
    </div>
  );
}

export default App;
