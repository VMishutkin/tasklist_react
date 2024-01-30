import axios from "axios";
import AuthHeader from "./auth-header";

const Task_BASE_REST_API_URL = "http://localhost:8080/api/v1/tasks/";

class TaskService {
  getTaskById(TaskId) {
    return axios.get(Task_BASE_REST_API_URL + TaskId, {
      headers: AuthHeader()

    });
  }
  updateTask(id, title, description) {
    return axios.put(Task_BASE_REST_API_URL, { id, title, description }, {
      headers: AuthHeader()
    });
  }
  changeStatus(id, taskStatus) {
    return axios.put(Task_BASE_REST_API_URL + id + "/status", {status: taskStatus}, {
      headers: AuthHeader()
    });
  }
  deleteTask(TaskId) {
    return axios.delete(Task_BASE_REST_API_URL + TaskId, {
      headers: AuthHeader()
    });
  }
}

/*
  getAllTasks() {
    return axios.get(Task_BASE_REST_API_URL);
  }
  getTaskById(TaskId) {
    return axios.get(Task_BASE_REST_API_URL + TaskId);
  }
  updateTask(TaskId, Task) {
    return axios.put(Task_BASE_REST_API_URL + TaskId, Task);
  }
  deleteTask(TaskId) {
    return axios.delete(Task_BASE_REST_API_URL + TaskId);
  }
  */


export default new TaskService();
