import React, { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";

const ListTaskComponent = () => {
  const [Tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    if (user)
      UserService.getAllTasks()
        .then((responce) => {
          setTasks(responce.data);
        })
        .catch((error) => {
          console.log(error);
        });
  };
  const changeStatus = (taskId, status) => {
    
      TaskService.changeStatus(taskId, status)
        .then(() => {
          getAllTasks();
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const deleteTask = (TaskId) => {
    TaskService.deleteTask(TaskId)
      .then(() => {
        getAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const translateStatus = (engStatus) => {
    switch(engStatus){
      case("TODO"):
        return <td>Новая</td>
        case("IN_PROGRESS"):
        return <td>В работе</td>
        case("DONE"):
        return <td>Выполнена</td>
    }
  }
  const username = (username) => {
  if(username){
    return <td>{username}</td>
  }
  }
  const usernameColumn = () => {
    
    if(Tasks[0] && 'username' in Tasks[0]){
      return <th>Пользователь</th>
    }
  }

  return (
    <div className="container">
      <h2 className="text-center"> Список задач </h2>
      <Link to="/add-task" className="btn btn-primary mb-2">
        Добавить задачу
      </Link>
      <table className="table table-bordered table-stripped">
        <thead>
          <th>Id</th>
          {usernameColumn()}
          <th>Название</th>
          <th>Описание</th>
          <th>Status</th>
          <th>Дата создания</th>
          <th>Дата изменения</th>
          <th>Действия</th>

        </thead>
        <tbody>
          {Tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              {username(task.username)}
              <td>{task.title}</td>
              <td>{task.description}</td>
              {translateStatus(task.status)}
              <td>{task.creationDate}</td>
              <td>{task.modifiedTime}</td>
              <td>
                <Link to={`/add-task/${task.id}`} className="btn btn-info">
                  Изменить
                </Link>
                <button
                  className="btn btn-info"
                  onClick={() => changeStatus(task.id, task.status)}
                  style={{ marginLeft: "10px" }}
                >
                  Статус
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTaskComponent;
