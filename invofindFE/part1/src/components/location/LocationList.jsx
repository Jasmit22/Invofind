import React, { useState } from "react";
import Location from "./Location";
import Togglable from "../Togglable";
import AddLocationForm from "./AddLocationForm";

const LocationList = ({
  locations,
  user,
  fetchData,
  checkLoginStatus,
  locationService,
  setIsDeleteLocationModalOpen,
  setLocationToDelete,
}) => {
  const [newLocationFilter, setNewLocationFilter] = useState("");

  String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
    // Check login status or perform any other necessary checks
    if (!checkLoginStatus()) {
      locationService.create(location).then((returnedLocation) => {
        fetchData();
      });
    }
  };

  const deleteLocation = (location) => {
    // Check login status or perform any other necessary checks
    setLocationToDelete(location);
    setIsDeleteLocationModalOpen(true);
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

  return showLocations();
};

export default LocationList;
