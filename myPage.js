window.addEventListener('DOMContentLoaded', function() {
    // AJAX 요청으로 로그인된 사용자의 이름과 사진 가져오기
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getUserName.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var nicknameElement = document.querySelector('.nickname');
            nicknameElement.innerHTML = response.nickname;

            var locationElement = document.querySelector('.location'); 
            locationElement.innerHTML = "활동지역 : " + response.location;

            // Update the background image for user image
            var userImageElement = document.querySelector('.user-image');
            userImageElement.style.backgroundImage = 'url(userImages/' + response.image + ')';
            userImageElement.style.backgroundSize = 'cover';
        }
    };
    xhr.send();

    // AJAX 요청으로 사용자의 키워드 가져오기
    var xhrKeywords = new XMLHttpRequest();
    xhrKeywords.open('GET', 'getKeywords.php', true);
    xhrKeywords.onreadystatechange = function() {
        if (xhrKeywords.readyState === 4 && xhrKeywords.status === 200) {
            var responseKeywords = JSON.parse(xhrKeywords.responseText);
            if (responseKeywords.success) {
                var keywordList = document.querySelector(".keywordbox");
                for (var i = 0; i < responseKeywords.keywords.length; i++) {
                    var keyword = responseKeywords.keywords[i];
                    var keywordElement = document.createElement("div");
                    keywordElement.classList.add("keyword-list");
                    keywordElement.textContent = "#" + keyword;
                    keywordList.appendChild(keywordElement);
                }
            } else {
                alert("키워드 가져오기에 실패했습니다.");
            }
        }
    };
    xhrKeywords.send();

    // AJAX 요청으로 판매 내역 가져오기
    var xhrSales = new XMLHttpRequest();
    xhrSales.open('GET', 'getSales.php', true);
    xhrSales.onreadystatechange = function() {
        if (xhrSales.readyState === 4 && xhrSales.status === 200) {
            var responseSales = JSON.parse(xhrSales.responseText);
            if (responseSales.success) {
                var saleList = document.querySelector('.saleBox');
                for (var i = 0; i < responseSales.sales.length; i++) {
                    var sale = responseSales.sales[i];

                    // 상품 이미지를 가져와서 요소를 생성합니다.
                    var saleImage = document.createElement('div');
                    saleImage.classList.add('sale-image');
                    saleImage.style.backgroundImage = 'url(productImages/' + sale.image + ')';
                    saleImage.style.backgroundSize = 'cover';

                    // 상품 제목을 가져와서 요소를 생성합니다.
                    var saleTitle = document.createElement('div');
                    saleTitle.classList.add('sale-title');
                    saleTitle.textContent = sale.name;

                    // 상품 이미지와 제목을 감싸는 컨테이너 요소를 생성합니다.
                    var saleContainer = document.createElement('div');
                    saleContainer.classList.add('sale-container');
                    saleContainer.appendChild(saleImage);
                    saleContainer.appendChild(saleTitle);
                    // 상품 가격을 가져와서 요소를 생성합니다.
                    var salePrice = document.createElement('div');
                    salePrice.classList.add('sale-price');
                    salePrice.textContent = sale.price + "원";

                    // 상품 컨테이너에 가격 요소를 추가합니다.
                    saleContainer.appendChild(salePrice);

                    // 상품 컨테이너를 상품 목록에 추가합니다.
                    saleList.appendChild(saleContainer);
                }
            } else {
                alert("판매 내역 가져오기에 실패했습니다.");
            }
        }
    };
    xhrSales.send();
        // AJAX 요청으로 관심 내역 가져오기
    var xhrInterest = new XMLHttpRequest();
    xhrInterest.open('GET', 'getInterest.php', true);
    xhrInterest.onreadystatechange = function() {
        if (xhrInterest.readyState === 4 && xhrInterest.status === 200) {
            var responseInterest = JSON.parse(xhrInterest.responseText);
            if (responseInterest.success) {
                var interestList = document.querySelector('.interestBox');
                for (var i = 0; i < responseInterest.interests.length; i++) {
                    var interest = responseInterest.interests[i];
                    // 상품 이미지를 가져와서 요소를 생성합니다.
                    var interestImage = document.createElement('div');
                    interestImage.classList.add('interest-image');
                    interestImage.style.backgroundImage = 'url(productImages/' + interest.image + ')';
                    interestImage.style.backgroundSize = 'cover';

                    // 상품 제목을 가져와서 요소를 생성합니다.
                    var interestTitle = document.createElement('div');
                    interestTitle.classList.add('interest-title');
                    interestTitle.textContent = interest.name;

                    // 상품 이미지와 제목을 감싸는 컨테이너 요소를 생성합니다.
                    var interestContainer = document.createElement('div');
                    interestContainer.classList.add('interest-container');
                    interestContainer.appendChild(interestImage);
                    interestContainer.appendChild(interestTitle);
                    // 상품 가격을 가져와서 요소를 생성합니다.
                    var interestPrice = document.createElement('div');
                    interestPrice.classList.add('interest-price');
                    interestPrice.textContent = interest.price + "원";

                    // 상품 컨테이너에 가격 요소를 추가합니다.
                    interestContainer.appendChild(interestPrice);

                    // 상품 컨테이너를 관심 내역 목록에 추가합니다.
                    interestList.appendChild(interestContainer);
                }
            } else {
                alert("관심 내역 가져오기에 실패했습니다.");
            }
        }
    };
    xhrInterest.send();

});
function updateKeywordCheck(keywordId) {
    // AJAX 요청으로 키워드의 check 값을 1로 업데이트하는 함수
    var xhrUpdateCheck = new XMLHttpRequest();
    xhrUpdateCheck.open("POST", "updateCheck.php", true);
    xhrUpdateCheck.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrUpdateCheck.onreadystatechange = function() {
      if (xhrUpdateCheck.readyState === 4 && xhrUpdateCheck.status === 200) {
        var responseUpdateCheck = JSON.parse(xhrUpdateCheck.responseText);
        if (responseUpdateCheck.success) {
          // 업데이트 성공 처리
          console.log("키워드의 check 값을 업데이트했습니다.");
        } else {
          // 업데이트 실패 처리
          console.error("키워드의 check 값을 업데이트하는데 실패했습니다.");
        }
      }
    };
    xhrUpdateCheck.send("keywordId=" + encodeURIComponent(keywordId));
  }

document.getElementById("logout").addEventListener("click", function(){
    window.location.href = "mainPage.html";
});
document.getElementById("mainpage").addEventListener("click", function(){
    window.location.href = "mainPage(login).html";
});

document.getElementById("addbtn").addEventListener("click", function(){
    var keywordInput = document.getElementById("keyword").value;
    if (keywordInput.trim() === "") {
        alert("키워드를 입력해주세요.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'addKeyword.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('keyword=' + encodeURIComponent(keywordInput));
    alert("추가가 완료되었습니다.");
    location.reload();
});
document.getElementById("bell").addEventListener("click", function(event) {
    var alarmElement = document.getElementById("alarm");
    if (alarmElement.style.display === "none") {
      alarmElement.style.display = "block";
  
      // 알림 창 내부 초기화
      alarmElement.innerHTML = "";
  
      // AJAX 요청으로 현재 로그인된 사용자의 키워드 가져오기
      var xhrKeywords = new XMLHttpRequest();
      xhrKeywords.open("GET", "getAlarm.php", true);
      xhrKeywords.onreadystatechange = function() {
        if (xhrKeywords.readyState === 4) {
          if (xhrKeywords.status === 200) {
            var responseKeywords = JSON.parse(xhrKeywords.responseText);
  
            if (responseKeywords.success) {
              var keywords = responseKeywords.keywords;
              keywords.reverse();
              keywords.forEach(function(keyword) {
                // 키워드를 알림 창 내부에 추가하는 코드를 작성합니다.
                var keywordElement = document.createElement("div");
                keywordElement.classList.add("keyword");
                if(keyword.check_ok == 1){
                    keywordElement.innerHTML =
                  "'" +
                  keyword.keyword +
                  "' 키워드 관련 새 글이 있습니다.<br>(" +
                  formatTimeAgo(keyword.minutes_ago) + "(읽음)";
                }
                else{
                    keywordElement.innerHTML =
                  "'" +
                  keyword.keyword +
                  "' 키워드 관련 새 글이 있습니다.<br>(" +
                  formatTimeAgo(keyword.minutes_ago);
                }
                  keywordElement.addEventListener("click", function() {
                    updateKeywordCheck(keyword.keyword);
                    var searchInput = keyword.keyword.trim();
                    sessionStorage.setItem("searchValue", searchInput);
                    sessionStorage.setItem("locationValue", "전체");

                    // 페이지 리다이렉션
                    window.location.href = "mainPage(login).html";
                  });
                  function formatTimeAgo(minutes) {
                    if (minutes < 60) {
                      return minutes + "분 전)";
                    } else {
                        return Math.floor(minutes / 60) + "시간 전)";
                    }
                  }
                alarmElement.appendChild(keywordElement);
              });
            } else {
              var keywordElement = document.createElement("div");
              keywordElement.classList.add("keyword2");
              keywordElement.textContent = "키워드 관련 새 글이 없습니다.";
              alarmElement.appendChild(keywordElement);
            }
          } else {
            console.error("응답 상태가 성공이 아닙니다.");
          }
        }
      };
      xhrKeywords.send();
    } else {
      alarmElement.style.display = "none";
    }
  });
  
  
  

