window.addEventListener('DOMContentLoaded', function() {
    // AJAX 요청으로 상품 정보 가져오기
    var xhrProducts = new XMLHttpRequest();
    xhrProducts.open('GET', 'getProducts.php', true);
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


document.getElementById("post").addEventListener("click", function(){
    alert("로그인 후 이용 가능합니다.");
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

document.getElementById("login").addEventListener("click", function(){
    window.location.href = "loginPage.html";
});
document.getElementById("signin").addEventListener("click", function(){
    window.location.href = "signinPage.html";
});
