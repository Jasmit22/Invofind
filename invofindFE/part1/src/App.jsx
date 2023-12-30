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
import ConfirmModal from "./components/ConfirmModal";
import AddUserModal from "./components/user/AddUserModal";
import TaskList from "./components/task/TaskList";
import ItemList from "./components/item/ItemList";
import IssueList from "./components/issue/IssueList";
import LocationList from "./components/location/LocationList";
import DepartmentList from "./components/extras/departments/DepartmentList";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [tasks, setTasks] = useState([]);
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
  const [newCategoryName, setNewCategoryName] = useState("");
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
        <DepartmentList
          departments={departments}
          user={user}
          fetchData={fetchData}
          checkLoginStatus={checkLoginStatus}
          departmentService={departmentService}
        />
        {showCategories()}
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
            setIsDeleteTaskModalOpen={setIsDeleteTaskModalOpen}
            setTaskToDelete={setTaskToDelete}
          />
        </div>
        <div id="Info2" className="tabcontent">
          <ItemList
            items={items}
            user={user}
            departments={departments}
            categories={categories}
            locations={locations}
            fetchData={fetchData}
            checkLoginStatus={checkLoginStatus}
            itemService={itemService}
            setItemToDelete={setItemToDelete}
            setIsDeleteItemModalOpen={setIsDeleteItemModalOpen}
          />
        </div>
        <div id="Info3" className="tabcontent">
          <IssueList
            issues={issues}
            user={user}
            fetchData={fetchData}
            checkLoginStatus={checkLoginStatus}
            issueService={issueService}
            setIssueToDelete={setIssueToDelete}
            setIsDeleteIssueModalOpen={setIsDeleteIssueModalOpen}
          />
        </div>
        <div id="Info4" className="tabcontent">
          <LocationList
            locations={locations}
            user={user}
            fetchData={fetchData}
            checkLoginStatus={checkLoginStatus}
            locationService={locationService}
            setLocationToDelete={setLocationToDelete}
            setIsDeleteLocationModalOpen={setIsDeleteLocationModalOpen}
          />
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
        onConfirm={handleConfirmDelete}
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
