import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

const register = (username, name, password, passwordConfirmation) => {
  return axios.post(API_URL + "register", {
    username,
    name,
    password,
    passwordConfirmation,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
