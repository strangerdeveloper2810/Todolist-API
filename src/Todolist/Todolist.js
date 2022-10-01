import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskApi,
  deleteTaskApi,
  doneTaskApi,
  getAllTaskApi,
  rejectTaskApi,
} from "../redux/actions/TodolistAction";
import "./TodolistStyle.css";
export default function Todolist(props) {
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

  const handleGetAllTask = () => {
    dispatch(getAllTaskApi());
  };

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
    dispatch(addTaskApi(state.values.taskName));
  };

  const handleDeleteTask = (taskName) => {
    dispatch(deleteTaskApi(taskName));
  };

  const handleDoneTask = (taskName) => {
    dispatch(doneTaskApi(taskName));
  };

  const handleRejectTask = taskName => {
    dispatch(rejectTaskApi(taskName));
  }

  return (
    <div className="card">
      <div className="card__header">
        <img src="./img/X2oObC4.png" alt="background" />
      </div>
      <form className="card__body" onSubmit={handleAddTask}>
        <div className="card__content">
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
              <button id="addItem" onClick={handleAddTask}>
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
