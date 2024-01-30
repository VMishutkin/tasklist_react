import React, { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const AddTaskComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [isAdmin, setIsAdmin] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateTask = (e) => {

    e.preventDefault();
    if (id) {
      TaskService.updateTask(id, title, description)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const Task = { title, description };
      UserService.createTask(Task)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    TaskService.getTaskById(id)
      .then((responce) => {
        setTitle(responce.data.first.title);
        setDescription(responce.data.first.description);
        setIsAdmin(responce.data.second)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    UserService.getAllUsernames().then((responce) => {
      setUsernames(responce.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);


  const mainTitle = () => {
    if (id) {
      return <h2 className="text-center">Изменить задачу</h2>;
    } else {
      return <h2 className="text-center">Создать задачу</h2>;
    }
  };

  const usernameChanger = () => {
    console.log(usernames);
    if (isAdmin && usernames.length) {
      return <div className="form-group mb-2">
        <label className="form-label">Назначить пользователю</label>
        <select value={username} onChange={e => setUsername(e.target.value)}>
          {
            usernames.map(opt => <option key={opt} value={opt}>{opt}</option>)
          }
        </select>
      </div>
    } else {
      return "";
    }
  }

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {mainTitle()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Название</label>
                  <input
                    type="text"
                    placeholder="Введите название"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Описание</label>
                  <input
                    type="text"
                    placeholder="Введите описание задачи"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>
                {usernameChanger()}
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateTask(e)}
                >
                  Сохранить
                </button>
                <Link to="/" className="btn btn-danger">
                  Отмена
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskComponent;
