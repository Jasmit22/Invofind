import axios from "axios";
// const baseUrl = "/api/stores";
const baseUrl = "http://localhost:3001/api/stores";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  });
  return request.then((response) => response.data);
};

export default { getAll, getById, setToken };
