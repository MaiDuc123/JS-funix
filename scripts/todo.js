"use strict";
//chẹck đăng nhập
if (currentUser) {
  //lấy DOM element
  const inputTask = document.getElementById("input-task");
  const btnAdd = document.getElementById("btn-add");
  const todoList = document.getElementById("todo-list");
  //hàm hiển thị danh sách todo list
  showTodoList();
  function showTodoList() {
    let html = "";
    //từ mảng todoArr lọc ra các todo của user đang đăng nhập để hiển thị
    todoArr
      .filter((todo) => todo.owner === currentUser.userName)
      .forEach(function (todo) {
        html = `
        <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>
        `;
      });
    todoList.innerHTML = html;
    //bắt các sự kiện
    //thông báo đã làm hay chưa làm
    eventToggleTasks();
    //xóa sự kiện
    eventDeleteTask();
  }
  //bắt sự kiện kích nút add thêm tasks
  btnAdd.addEventListener("click", function () {
    //kiểm tra người dùngnhaajp thông tin vào chưa
    if (inputTask.value.trim().length === 0) {
      alert("Bạn chưa nhập gì cả");
    } else {
      const todo = new Task(inputTask.value, currentUser.userName, false);
      //thêm task mới vào mảng todoArr
      todoArr.push(todo);
      //lưu xuống localStrorage
      saveToStorage("todoArr", todoArr);
      //hiển thị lại các sự kiện
      showTodoList();
      //xóa dữ liệu ở phần form nhập
      inputTask.value = "";
    }
  });
  //bắt hàm sự kiện toggle task
  function eventToggleTasks() {
    //lấy tất cả các phần tử li chứa các nhiệm vụ
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        //tránh nút xóa, tránh chồng sự kiện khi ấn nút xóa
        if (e.target !== liEl.children[0]) {
          //chỉ đến thẻ con của li
          liEl.classList.toggle("checked");
          //thực hiện lưu các thay đổi
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === currentUser.userName &&
              todoItem.task === liEl.textContent.slice(0, -1) // lấy nội dung text chứa sự kiện trừ đi dấu x - loại phần tử con cuối
          );
          //thay đổi thuộc tính isDone của nó
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          //lưu xuống localStrorage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }
  //hàm bắt sự kiện xóa các task
  function eventDeleteTask() {
    //lấy tất cả các phần tử delete, bắt sự kiện click trên từng phần tử đó
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        //xác nhận xóa
        const deleteEl = confirm("Bạn chắc chắn muốn xoá sự kiện");
        if (deleteEl) {
          //tìm vị trí của task được chọn xóa trong mảng todoArr
          const index = todoArr.findIndex(
            (item) =>
              item.owner === currentUser.userName && //xác nhận tên user và task
              item.task === closeEl.parentElement.textContent.slice(0, -1) //xác định tên task và so sánh
          );
          //xóa task khỏi mảng todoArr
          todoArr.splice(index, 1);
          //lư dữ liệu xuông localStrorage
          saveToStorage("todoArr", todoArr);
          //hiển thị lại list todo
          showTodoList();
        }
      });
    });
  }
  //chưa đăng nhập thì hiện yêu cầu đăng nhập
} else {
  alert("Vui lòng đăng nhập/đăng ký để truy cập ứng dụng");
  window.location.href = "../index.html";
}
