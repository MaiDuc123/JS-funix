"use strict";
//check đăng nhập
if (currentUser) {
  //lây dom element
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  //sự kiện lưu vào setting
  btnSubmit.addEventListener("click", function () {
    if (validate) {
      //cập nhập lại currentUser
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      //lưu dữ liệu xuống localStorage
      saveToStorage("currentUser", currentUser);
      //cập nhập lại mảng userArr
      const index = userArr.findIndex(
        (userItem) => userItem.userName === currentUser.userName
      );
      userArr[index] = currentUser;
      saveToStorage("userArr", userArr);
      //reset form đăng nhập, thông báo cài đặt thành công, chuyển tới trang new
      inputPageSize.value = "";
      inputCategory.value = "General";
      window.location.href = "../pages/news.html";
    }
  });
  //hàm validata dữ liệu người dùng nhập
  function validate() {
    let check = true;
    //kiểm tra thông tin nhập vào news per page
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("Thông tin không hợp lệ, vui lòng nhập lại");
      check = false;
    }
    return check;
  }
} else {
  alert("Vui lòng đăng nhập/đăng ký để truy cập ứng dụng");
  window.location.href = "../index.html";
}
