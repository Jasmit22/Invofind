import axios from "axios";
// const baseUrl = "/api/issues";
const baseUrl = "http://localhost:3001/api/issues";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    if (
      error.response.data.error ===
      "Validation error: Validation min on year failed"
    ) {
      return "Year Min Fail";
    }
    if (
      error.response.data.error ===
      "Validation error: Validation max on year failed"
    ) {
      return "Year Max Fail";
    }
    console.log(error);
    return { error: error.response.data.error };
  }
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, remove, setToken };
