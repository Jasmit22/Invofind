import React from "react";

const Issue = ({ issue, markResolved, user, deleteIssue }) => {
  const renderDelete = () => {
    return (
      <td className="text-center">
        <button
          className="text-white p-1.5 cursor-pointer ml-8 mr-6 border-2 border-transparent hover:border-[#a0d2eb]"
          style={{ backgroundColor: "#8458b3" }}
          onClick={() => {
            deleteIssue(issue);
          }}
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
          className="text-white p-1.5 cursor-pointer ml-8 border-2 border-transparent"
          style={{
            backgroundColor: issue.resolved ? "#4CAF50" : "#f44336",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => {
            markResolved(issue);
          }}
        >
          {issue.resolved ? "Make Unresolved" : "Mark Resolved"}
        </button>
      </td>
      {user.admin && renderDelete()}
    </React.Fragment>
  );
};

export default Issue;
