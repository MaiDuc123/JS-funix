"use strict";
//lấy DOM element
const inputUserName = document.getElementById("input-username");
const inputPassWord = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");
//bắt sự kiện vào nút login
submitBtn.addEventListener("click", function () {
  //kiểm tra người dùng đã nhập đủ thông tin hay chưa
  const checkLogin = validata();
  if (checkLogin) {
    //tìm kiếm trong object userArr thông tin đang nhập có đúng kh
    const login = userArr.find(
      (arr) =>
        arr.userName === inputUserName.value &&
        arr.passWord === inputPassWord.value
    );
    if (login) {
      //nhận thông báo
      alert("Đăng nhập thành công");
      //lưu vào localStorage
      saveToStorage("currentUser", login);
      //điều hướng về trang chủ
      window.location.href = "../index.html";
    } else {
      //kh đúng thì hiện thông báo
      alert("Đăng nhập thất bại, hãy kiểm tra lại");
    }
  }
});
//hàm kiểm tra điều kiện nhập vào có trống hay kh
function validata() {
  let check = true;
  //kiểm tra kh có trường nào bị bỏ trống
  if (inputUserName.value.trim().length === 0) {
    alert("Hãy nhập UserName");
    check = false;
  }
  //phần pass bỏ trim() dấu cách cx là 1 ký tự
  if (inputPassWord.value.length === 0) {
    alert("Hãy nhập PassWord");
    check = false;
  }
  return check;
}
