import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_TASK_API } from "../redux/constants/TodolistConstants";
import "./TodolistStyle.css";
export default function TodolistReduxSaga(props) {
  let [state, setState] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.TodolistReducer);

  const renderDate = () => {
    const date = new Date();
    return (
      <p>
        {date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          " - " +
          date.getHours() +
          ":" +
          date.getMinutes()}
      </p>
    );
  };

  const handleChangeInput = (event) => {
    let { name, value } = event.target;

    let newValues = { ...state.values };
    newValues = { ...state.values, [name]: value };
    let newErrors = { ...state.errors };

    let regexString = /^[a-z A-Z 0-9]+$/;

    if (!regexString.test() || value.trim() === "") {
      newErrors[name] = name + " invalid!";
    } else {
      newErrors[name] = "";
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  const handleGetAllTask = () => {};

  useEffect(() => {
    handleGetAllTask();
    return () => {};
  }, []);

  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((task, index) => (
        <li key={index}>
          <span>{task.taskName}</span>
          <div className="buttons">
            <button
              className="remove"
              type="button"
              onClick={() => {
                handleDeleteTask(task.taskName);
              }}
            >
              <i className="fa fa-trash-alt" />
            </button>
            <button
              className="complete"
              type="button"
              onClick={() => {
                handleDoneTask(task.taskName);
              }}
            >
              <i className="fa fa-check-circle" />
            </button>
          </div>
        </li>
      ));
  };

  const renderTaskCompleted = () => {
    return taskList
      .filter((item) => item.status)
      .map((task, index) => (
        <li key={index}>
          <span>{task.taskName}</span>
          <div className="buttons">
            <button
              className="remove"
              type="button"
              onClick={() => {
                handleDeleteTask(task.taskName);
              }}
            >
              <i className="fa fa-trash-alt" />
            </button>
            <button
              className="complete"
              type="button"
              onClick={() => {
                handleRejectTask(task.taskName);
              }}
            >
              <i className="fa fa-undo" />
            </button>
          </div>
        </li>
      ));
  };

  const handleAddTask = (event) => {
    event.preventDefault();
  };

  const handleDeleteTask = (taskName) => {};

  const handleDoneTask = (taskName) => {};

  const handleRejectTask = (taskName) => {};

  return (
    <div className="card">
      <button className="btn btn-success text-center" onClick={()=>{
        dispatch({
            type: GET_TASK_API
        });
      }}>Dispatch</button>
      <div className="card__header">
        <img src="./img/X2oObC4.png" alt="background" />
      </div>

      <form className="card__body" onSubmit={handleAddTask}>
        <div className="card__content">
          <h3 className="text-success text-center">Todolist Redux-Saga</h3>
          <div className="card__title">
            <h2>My Tasks</h2>
            {renderDate()}
          </div>

          <div className="form-group">
            <div className="card__add">
              <input
                id="newTask"
                type="text"
                name="taskName"
                onChange={handleChangeInput}
                placeholder="Enter an activity..."
              />
              <button id="addItem" type="button" onClick={handleAddTask}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <p className="text-danger ms-2">{state.errors.taskName}</p>
          </div>

          <div className="form-group">
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {renderTaskCompleted()}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
