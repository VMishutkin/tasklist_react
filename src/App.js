import "./App.css";
import AddTaskComponent from "./components/AddTaskComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponment from "./components/HeaderComponent";
import ListTaskComponent from "./components/ListTaskComponent";
import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderComponment />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListTaskComponent />}></Route>
            <Route
              path="/add-Task"
              element={<AddTaskComponent />}
            ></Route>
            <Route
              path="/tasks"
              element={<ListTaskComponent />}
            ></Route>
            <Route
              path="/add-Task/:id"
              element={<AddTaskComponent />}
            ></Route>
            <Route path="/login"
              element={<Login />}>
            </Route>
            <Route
              path="/register"
              element={<Register />}>
            </Route>
          </Routes>
        </div>
        
      </Router>
    </div>
  );
}

export default App;
