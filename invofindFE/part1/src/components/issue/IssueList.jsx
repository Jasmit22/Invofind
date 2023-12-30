import React, { useState } from "react";
import Issue from "./Issue";
import Togglable from "../Togglable";
import AddIssueForm from "./AddIssueForm";

const IssueList = ({
  issues,
  user,
  fetchData,
  issueService,
  checkLoginStatus,
  setIsDeleteIssueModalOpen,
  setIssueToDelete,
}) => {
  const [newIssueFilter, setNewIssueFilter] = useState("");

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
    // Check login status or perform any other necessary checks
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
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      if (issue.description !== null) {
        issueService.create(issue).then((returnedIssue) => {
          fetchData();
        });
      }
    }
  };

  const deleteIssue = (issue) => {
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      handleDeleteIssueClick(issue);
    }
  };

  const handleDeleteIssueClick = (issue) => {
    setIssueToDelete(issue);
    setIsDeleteIssueModalOpen(true);
  };

  return showIssues();
};

export default IssueList;
