import React, { useState } from "react";

const AddUserModal = ({ isOpen, onClose, onAdd, message }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Boolean state for admin status

  const clearAll = () => {
    // Clear all fields and errors, reset isAdmin to false
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setIsAdmin(false);
    onClose();
  };

  const handleAdd = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    clearAll();
    onAdd(username, firstName, lastName, password, isAdmin); // Pass an object including isAdmin to onAdd
  };

  const handleCancel = () => {
    clearAll();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#31343f] p-4 rounded-lg text-center">
        <p className="text-white mb-4">
          <b>{message}</b>
        </p>
        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="mb-2 p-2 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="mb-2 p-2 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="mb-2 p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-2 p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-2 p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex items-center mb-2">
            <input
              id="role-user"
              type="radio"
              name="isAdmin"
              value="false"
              checked={!isAdmin}
              onChange={() => setIsAdmin(false)}
              className="accent-[#a0d2eb] mr-2"
            />
            <label htmlFor="role-user" className="text-white mr-4">
              User
            </label>
            <input
              id="role-admin"
              type="radio"
              name="isAdmin"
              value="true"
              checked={isAdmin}
              onChange={() => setIsAdmin(true)}
              className="accent-[#a0d2eb] mr-2"
            />
            <label htmlFor="role-admin" className="text-white">
              Admin
            </label>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="bg-[#a0d2eb] text-[#373b4c] px-4 py-2 rounded mr-2"
        >
          Confirm
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddUserModal;
