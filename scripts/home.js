"use strict";
//lấy dom element
const loginModal = document.getElementById("login-modal");
const welcomeMessage = document.getElementById("welcome-message");
const mainContent = document.getElementById("main-content");
const btnLogout = document.getElementById("btn-logout");
//yêu cầu số 4: hàm thực hiện chức năng home page
displayHome();
function displayHome() {
  //nếu có người đăng nhập
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    //thông báo chào
    welcomeMessage.textContent = `Xin chào ${currentUser.firstName}`;
  } else {
    //nếu kh có người đang nhập
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

//yêu cầu sô 5: chức năng logout
btnLogout.addEventListener("click", function () {
  alert("Bạn có muốn đăng xuất");
  //thực hiện xóa userhiện tại ở localStorage
  localStorage.removeItem("currentUser");
  //tải lại trang
  location.reload();
  console.log(typeof currentUser);
  //chạy lại yêu cầu số 4
  displayHome();
});
