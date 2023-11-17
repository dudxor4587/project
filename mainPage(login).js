window.addEventListener('DOMContentLoaded', function() {
    // AJAX 요청으로 로그인된 사용자의 이름과 사진 가져오기
    
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getUserName.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.querySelector('.nickname').textContent = response.nickname;
            var userImageElement = document.querySelector('.user-image');
            userImageElement.style.backgroundImage = 'url(userImages/' + response.image + ')';
            userImageElement.style.backgroundSize = 'cover';
            // 현재 사용자의 위치를 기반으로 select 요소의 기본 값을 설정합니다.
            var searchValue = sessionStorage.getItem("searchValue");
            var locationValue = sessionStorage.getItem("locationValue");

            // 가져온 데이터를 사용하여 작업 수행
            if (searchValue && locationValue) {
            document.getElementById("search").value = searchValue;
            document.getElementById("locationSelect").selectedIndex = 0;
            
            // 추가 작업 수행
            searchProducts();
            sessionStorage.removeItem("searchValue");
            sessionStorage.removeItem("locationValue");
            } 
            else{
            var locationSelect = document.getElementById('locationSelect');
            var userLocation = response.location;
            for (var i = 0; i < locationSelect.options.length; i++) {
                if (locationSelect.options[i].textContent === userLocation) {
                    locationSelect.selectedIndex = i;
                    break;
                }
            }

            // AJAX 요청으로 상품 정보 가져오기
                    // 입력된 정보 가져오기
            var searchInput = document.getElementById('search').value.trim();
            var minInput = document.getElementById('min').value.trim();
            var maxInput = document.getElementById('max').value.trim();
            var locationSelect = document.getElementById('locationSelect');
            var locationInput = locationSelect.options[locationSelect.selectedIndex].textContent;

            // AJAX 요청으로 검색 정보 전송
            var xhrProducts = new XMLHttpRequest();
            xhrProducts.open('GET', 'search.php?search=' + encodeURIComponent(searchInput) + '&min=' + encodeURIComponent(minInput) + '&max=' + encodeURIComponent(maxInput) + '&location=' + encodeURIComponent(locationInput), true);
            xhrProducts.onreadystatechange = function() {
                if (xhrProducts.readyState === 4 && xhrProducts.status === 200) {
                    var responseProducts = JSON.parse(xhrProducts.responseText);
                    if (responseProducts.success) {
                        var productBox = document.querySelector('.product_box');
                        for (var i = 0; i < responseProducts.products.length; i++) {
                            var product = responseProducts.products[i];

                            // 상품 이미지를 가져와서 요소를 생성합니다.
                            var productImage = document.createElement('div');
                            productImage.classList.add('product-image');
                            productImage.style.backgroundImage = 'url(productImages/' + product.image + ')';
                            productImage.style.backgroundSize = 'cover';

                            // 상품 제목을 가져와서 요소를 생성합니다.
                            var productTitle = document.createElement('div');
                            productTitle.classList.add('product-title');
                            productTitle.textContent = product.name;

                            // 상품 이미지와 제목을 감싸는 컨테이너 요소를 생성합니다.
                            var productContainer = document.createElement('div');
                            productContainer.classList.add('product-container');
                            productContainer.appendChild(productImage);
                            productContainer.appendChild(productTitle);

                            // 상품 가격을 가져와서 요소를 생성합니다.
                            var productPrice = document.createElement('div');
                            productPrice.classList.add('product-price');
                            productPrice.textContent = product.price + "원";

                            // 상품 컨테이너에 가격 요소를 추가합니다.
                            productContainer.appendChild(productPrice);
                            productContainer.setAttribute("id", product.ID);

                            // 상품 컨테이너를 상품 목록에 추가합니다.
                            productBox.appendChild(productContainer);
                        }
                    } else {
                        alert('상품 정보 가져오기에 실패했습니다.');
                    }
                }
            };
            xhrProducts.send();
            }

        }
    };
    xhr.send();
    
    // 검색 버튼 클릭 이벤트 처리
    var searchButton = document.querySelector('.fa-magnifying-glass');
    searchButton.addEventListener("click", function() {
        // 입력된 정보 가져오기
        var searchInput = document.getElementById('search').value.trim();
        var minInput = document.getElementById('min').value.trim();
        var maxInput = document.getElementById('max').value.trim();
        var locationSelect = document.getElementById('locationSelect');
        var locationInput = locationSelect.options[locationSelect.selectedIndex].textContent;

        // AJAX 요청으로 검색 정보 전송
        var xhrSearch = new XMLHttpRequest();
        xhrSearch.open('GET', 'search.php?search=' + encodeURIComponent(searchInput) + '&min=' + encodeURIComponent(minInput) + '&max=' + encodeURIComponent(maxInput) + '&location=' + encodeURIComponent(locationInput), true);
        xhrSearch.onreadystatechange = function() {
            if (xhrSearch.readyState === 4 && xhrSearch.status === 200) {
                var responseSearch = JSON.parse(xhrSearch.responseText);
                if (responseSearch.success) {
                    var productBox = document.querySelector('.product_box');
                    productBox.innerHTML = ""; // 기존 상품 목록 초기화

                    for (var i = 0; i < responseSearch.products.length; i++) {
                        var product = responseSearch.products[i];

                        // 상품 이미지를 가져와서 요소를 생성합니다.
                        var productImage = document.createElement('div');
                        productImage.classList.add('product-image');
                        productImage.style.backgroundImage = 'url(productImages/' + product.image + ')';
                        productImage.style.backgroundSize = 'cover';

                        // 상품 제목을 가져와서 요소를 생성합니다.
                        var productTitle = document.createElement('div');
                        productTitle.classList.add('product-title');
                        productTitle.textContent = product.name;

                        // 상품 이미지와 제목을 감싸는 컨테이너 요소를 생성합니다.
                        var productContainer = document.createElement('div');
                        productContainer.classList.add('product-container');
                        productContainer.appendChild(productImage);
                        productContainer.appendChild(productTitle);

                        // 상품 가격을 가져와서 요소를 생성합니다.
                        var productPrice = document.createElement('div');
                        productPrice.classList.add('product-price');
                        productPrice.textContent = product.price + "원";

                        // 상품 컨테이너에 가격 요소를 추가합니다.
                        productContainer.appendChild(productPrice);
                        productContainer.setAttribute("id", product.ID);

                        // 상품 컨테이너를 상품 목록에 추가합니다.
                        productBox.appendChild(productContainer);
                    }
                } else {
                    alert('검색 결과가 없습니다.');
                }
            }
        };
        xhrSearch.send();
    });

    // ...
});

document.getElementById("mypage").addEventListener("click", function(){
    window.location.href = "myPage.html";
});

document.getElementById("logout").addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "logout.php", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 로그아웃 후 처리
        window.location.href = "mainPage.html";
      }
    };
    xhr.send();
  });

document.getElementById("post").addEventListener("click", function(){
    window.location.href = "salePage.html";
});


document.querySelector('.product_box').addEventListener("click", function(event) {
    var clickedElement = event.target.closest('.product-container');
    if (clickedElement) {
      var productId = clickedElement.id;
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
              // user_id와 ID가 일치하는 경우
              window.location.href = "infoPage(sale).html";
            } else {
              // user_id와 ID가 일치하지 않는 경우
              window.location.href = "infoPage.html";
            }
          } else {
            console.error("AJAX request failed with status: " + xhr.status);
          }
        }
      };
  
      xhr.open("POST", "check_sale_info.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("id=" + productId);
    }
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
                  document.getElementById("search").value = keyword.keyword.trim();
                  document.getElementById("locationSelect").selectedIndex = 0;
                  document.getElementById("alarm").style.display='none';
                  searchProducts();
                });
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
  // 분 단위의 시간을 "분 전" 또는 "시간 전"으로 변환하는 함수
function formatTimeAgo(minutes) {
    if (minutes < 60) {
      return minutes + "분 전)";
    } else {
        return Math.floor(minutes / 60) + "시간 전)";
    }
  }
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
  
  function searchProducts() {
    var searchInput = document.getElementById("search").value.trim();
    var minInput = document.getElementById("min").value.trim();
    var maxInput = document.getElementById("max").value.trim();
    var locationSelect = document.getElementById("locationSelect");
    var locationInput =
      locationSelect.options[locationSelect.selectedIndex].textContent;
  
    var xhrSearch = new XMLHttpRequest();
    xhrSearch.open(
      "GET",
      "search.php?search=" +
        encodeURIComponent(searchInput) +
        "&min=" +
        encodeURIComponent(minInput) +
        "&max=" +
        encodeURIComponent(maxInput) +
        "&location=" +
        encodeURIComponent(locationInput),
      true
    );
    xhrSearch.onreadystatechange = function() {
      if (xhrSearch.readyState === 4 && xhrSearch.status === 200) {
        var responseSearch = JSON.parse(xhrSearch.responseText);
        if (responseSearch.success) {
          var productBox = document.querySelector(".product_box");
          productBox.innerHTML = ""; // 기존 상품 목록 초기화
  
          for (var i = 0; i < responseSearch.products.length; i++) {
            var product = responseSearch.products[i];
  
            // 상품 이미지를 가져와서 요소를 생성합니다.
            var productImage = document.createElement("div");
            productImage.classList.add("product-image");
            productImage.style.backgroundImage =
              "url(productImages/" + product.image + ")";
            productImage.style.backgroundSize = "cover";
  
            // 상품 제목을 가져와서 요소를 생성합니다.
            var productTitle = document.createElement("div");
            productTitle.classList.add("product-title");
            productTitle.textContent = product.name;
  
            // 상품 이미지와 제목을 감싸는 컨테이너 요소를 생성합니다.
            var productContainer = document.createElement("div");
            productContainer.classList.add("product-container");
            productContainer.appendChild(productImage);
            productContainer.appendChild(productTitle);
  
            // 상품 가격을 가져와서 요소를 생성합니다.
            var productPrice = document.createElement("div");
            productPrice.classList.add("product-price");
            productPrice.textContent = product.price + "원";
  
            // 상품 컨테이너에 가격 요소를 추가합니다.
            productContainer.appendChild(productPrice);
            productContainer.setAttribute("id", product.ID);
  
            // 상품 컨테이너를 상품 목록에 추가합니다.
            productBox.appendChild(productContainer);
          }
        } else {
          alert("검색 결과가 없습니다.");
        }
      }
    };

    xhrSearch.send();
  }
  




