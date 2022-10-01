import axios from "axios";
import Swal from "sweetalert2";
import { GET_ALL_TASK_API } from "../constants/TodolistConstants";

export const getAllTaskApi = () => {
  return async (dispatch) => {
    let { data, status } = await axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    try {
      if (status === 200) {
        dispatch({
          type: GET_ALL_TASK_API,
          taskList: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addTaskApi = (taskName) => {
  return async (dispatch) => {
    // Xử lý trước khi dispatch
    let { status } = await axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: taskName },
    });
    try {
      if (status === 200) {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Add task Success!",
        });
        dispatch(getAllTaskApi());
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Opps!",
        text: "Something went wrong!",
      });
    }
  };
};

export const deleteTaskApi = (taskName) => {
  return async (dispatch) => {
    let { status } = await axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    try {
      if (status === 200) {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Delete task Success!",
        });
        dispatch(getAllTaskApi());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const doneTaskApi = (taskName) => {
  return async (dispatch) => {
    let { status } = await axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    try {
      if (status === 200) {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Update task Success!",
        });
        dispatch(getAllTaskApi());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const rejectTaskApi = (taskName) => {
  return async (dispatch) => {
    let { status } = await axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    try {
      if (status === 200) {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Reject task Success!",
        });
        dispatch(getAllTaskApi());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
