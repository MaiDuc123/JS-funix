"use strict";
//lấy dom element
const inputFirstName = document.getElementById("input-firstname");
const inputLastName = document.getElementById("input-lastname");
const inputUserName = document.getElementById("input-username");
const inputPassWord = document.getElementById("input-password");
const inputConfirmPw = document.getElementById("input-password-confirm");
const submitBtn = document.getElementById("btn-submit");

//bắt sự kiện vào nút register
submitBtn.addEventListener("click", function () {
  //lấy dữ liệu nhập vào từ người dùng
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassWord.value
  );
  console.log(user);
  const checkUser = validata(user);
  //thông tin người dùng nhập thỏa mãn các điều kiên
  if (checkUser) {
    //thêm dữ liệu
    userArr.push(user);
    //lưu xuống localStorage
    saveToStorage("userArr", userArr);
    alert("Bạn đã đăng ký thành công");
    //điều hướng đến trang login
    window.location.href = "../pages/login.html";
  }
});
//hàm kiểm tra điều kiện nhập vào
function validata(user) {
  let check = true;
  //kiểm tra không có trường nào bị bỏ trống
  if (user.firstName.trim().length === 0) {
    alert("Hãy nhập Tên");
    check = false;
  }
  if (user.lastName.trim().length === 0) {
    alert("Hãy nhập Họ");
    check = false;
  }
  if (user.userName.trim().length === 0) {
    alert("Hãy nhập tên đăng nhập");
    check = false;
  }
  //userName không được trùng với userName đã tồn tại
  userArr.forEach((arr) =>
    user.userName === arr.userName
      ? (alert("Tên đăng nhập đã tồn tại"), (check = false))
      : (check = true)
  );
  //pass phải có trên 8 ký tự
  if (user.passWord.length < 8) {
    alert("Mật khẩu phải có 8 ký tự");
    check = false;
  }
  //pass với confirmpw phải giống nhau
  if (user.passWord !== inputConfirmPw.value) {
    alert("Mật khẩu không giống");
    check = false;
  }
  return check;
}
