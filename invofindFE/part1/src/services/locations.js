import axios from "axios";
// const baseUrl = "/api/locations";
const baseUrl = "http://localhost:3001/api/locations";

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
    console.log(error);
    return { error: error.response.data.error };
  }
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, remove, setToken };
