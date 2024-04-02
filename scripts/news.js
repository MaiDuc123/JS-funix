"use strict";
//Check xem đã đăng nhập chưa
if (currentUser) {
  //lấy DOM element
  const newContainer = document.getElementById("news-container");
  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");

  let totalResults = 0;
  let lengthArticles = 0;

  //hàm lấy dữ liệu từ API, hiển thị danh sách news ra ứng dụng
  getDataNews("us", 1);
  async function getDataNews(country, page) {
    try {
      //kết nối API và lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=fe3abfb0cadf4e16a75f52b17d2e2400`
      );
      console.log(res);
      //sử dụng phương thức có sẵn trên các response cuả phương thức fetch là json để láy body
      const data = await res.json();
      console.log(data);
      //kiểm tra lỗi khi chạy
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }
      //gọi hàm hiển thị danh sách item
      displayNewList(data);
    } catch (err) {
      //bắt lỗi
      alert("Error: " + err.message);
    }
  }
  // hàm hiển thị danh sách trên trang
  function displayNewList(data) {
    //lấy giá trị cho biến totalResults
    totalResults = data.totalResults;
    lengthArticles = data.articles.length;

    console.log(totalResults, lengthArticles);
    console.log(currentUser.category);
    //kiểm tra điều ẩn hiện các nút prev và next
    checkPrevious();
    checkNext();
    //hiển thị kết quả
    let html = "";
    data.articles.forEach(function (article) {
      html += `
      <div class="card flex-row flex-wrap" style="padding: 30px">
      <div class="col-md-4">
      <img class="card-img" src=${
        article.urlToImage
          ? article.urlToImage
          : "../No-Image-Found-400x264.png"
      } alt="img" />
      </div>
      <div class="col-md-8">
        <h4>${article.title}</h4>
        <h5>${article.description}</h5>
        <a href="${
          article.url
        }" target="_blank" class=" btn btn-primary">View more</a>
      </div>
      </div>
      `;
    });
    newContainer.innerHTML = html;
  }
  //hàm kiểm tra điều kiện nút prev
  function checkPrevious() {
    //nếu page bằng 1 thì ẩn nút prev
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
    btnPrev.style.display = pageNum.textContent == 1 ? "none" : "block";
  }
  //hàm kiểm tra điều kiện nút next
  function checkNext() {
    //so sánh kết quả và trả về với tổng số kết quả
    if (lengthArticles < currentUser.pageSize) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  //bắt sự kiện khi kích vào nút prev
  btnPrev.addEventListener("click", function () {
    //lấy danh sách dữ liệu và hiển thị ds các new trước đó
    getDataNews("us", --pageNum.textContent);
  });
  //bắt sự kiện khi kích vào nút next
  btnNext.addEventListener("click", function () {
    //lấy danh sách dữ liệu và hiển thị ds các new trước đó
    getDataNews("us", ++pageNum.textContent);
  });
  //chưa đăng nhập thì yêu cầu đăng nhập
} else {
  alert("Vui lòng đăng nhập/đăng ký để truy cập ứng dụng ");
  window.location.href = "index.html";
}
