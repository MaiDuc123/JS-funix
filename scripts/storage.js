"use strict";
//lưu xuống localStorage
function saveToStorage(key, value) {
  //localStorage chỉ lưu giá trị số, string hoặc boolean > json.stringify chuyển giá trị object về string
  localStorage.setItem(key, JSON.stringify(value));
}
//lấy dữ liệu từ localStorage
function getFromStorage(key) {
  //chuyển gtri đang đc lưu ở localStorage từ string về object
  return JSON.parse(localStorage.getItem(key));
}
//lấy giữ liệu user từ storage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
//thực hiện chuyển đổi từ js object sang class instance
const userArr = users.map((user) => parseUser(user));
//lấy dữ liệu từu user đăng nhập
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;
//lấy giữ liệu todo từ storage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
//thực hiện chuyển đổi từ js object sang class instance
const todoArr = todos.map((todo) => parseTask(todo));
//hàm chuyển user từ js object sang class instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord,
    //phần 9: thay đổi thiết lập
    userData.pageSize,
    userData.category
  );
  return user;
}
//hàm chuyển task từ js object sang class instance: yêu cầu 8
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
