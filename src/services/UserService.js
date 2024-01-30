import axios from "axios";
import AuthHeader from "./auth-header";

const USER_BASE_REST_API_URL = "http://localhost:8080/api/v1/users/";
const user = JSON.parse(localStorage.getItem("user"));




class UserService {


  getAllTasks() {
    const userId = user.id
    return axios.get(USER_BASE_REST_API_URL + userId + "/tasks", {
      headers: AuthHeader()
    });
  }
  getAllUsernames() {
    return axios.get(USER_BASE_REST_API_URL, {
      headers: AuthHeader()
    })
  }

  createTask(task) {
    console.log({ task })
    const userId = user.id
    console.log({ userId })
    return axios.post(USER_BASE_REST_API_URL + userId + "/tasks", task,
      { headers: AuthHeader() }
    );

  }

  updateTask(TaskId, Task) {
    return axios.put(USER_BASE_REST_API_URL + TaskId, Task);
  }
  deleteTask(TaskId) {
    return axios.delete(USER_BASE_REST_API_URL + TaskId);
  }

}

export default new UserService();
