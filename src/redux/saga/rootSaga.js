import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_TASK_API, GET_TASK_API } from "../constants/TodolistConstants";
function* getTaskAPI(action) {
  // yield take() theo dõi action => xem action nào dispatch mới làm các công việc bên dưới, giống như type (action creator)

  let { data, status } = yield call(() => {
    return axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
  });

  // Sau khi lấy giá trị thành công dùng put (giống dispatch bên redux-thunk)

  yield put({
    type: GET_ALL_TASK_API,
    taskList: data,
  });
}

export function* rootSaga() {
  yield takeLatest(GET_TASK_API, getTaskAPI);
}
