// 로그아웃 버튼 클릭 이벤트
document.getElementById("logout").addEventListener("click", function(){
    window.location.href = "mainPage.html";
});

// 마이페이지 버튼 클릭 이벤트
document.getElementById("mypage").addEventListener("click", function(){
    window.location.href = "myPage.html";
});

document.getElementById("sellBtn").addEventListener("click", function(){
    window.location.href = "confirmPage.html";
});

// 페이지 로드 시 데이터 가져오기
document.addEventListener("DOMContentLoaded", function() {
    // AJAX 요청을 사용하여 PHP 파일에서 데이터 가져오기
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // 이름, 가격, 내용을 가져와서 원하는 위치에 적용
                    var nameElement = document.querySelector('.infoBox_bar1-saler');
                    var priceElement = document.querySelector('.infoBox_bar2-name');
                    var contentElement = document.querySelector('.infoBox_info');
                    var imageContainer = document.querySelector('.image_box');
                    var date = document.querySelector('.date');
                    
                    nameElement.textContent = response.name;
                    date.textContent = response.date;
                    priceElement.textContent = response.price + " 원";
                    contentElement.textContent = response.content;
                    
                    // product_images의 모든 값에 "productImages/"를 추가하여 이미지 요소 생성
                    response.product_images.forEach(function(imageUrl) {
                        var imageElement = document.createElement('img');
                        imageElement.style.backgroundImage = 'url(productImages/' + imageUrl + ')';
                        imageElement.setAttribute("class","product");
                        imageContainer.appendChild(imageElement);
                    });
                    
                    // AJAX 요청 후 이미지 표시 부분
                    var imageUrls = response.product_images;
                    var currentIndex = 0;

                    // 이미지 표시 함수
                    function showImage(index) {
                        // 이미지 요소 초기화
                        imageContainer.innerHTML = '';

                        // 다음 이미지 표시
                        var imageElement = document.createElement('img');
                        imageElement.src = 'productImages/' + imageUrls[index];
                        imageElement.setAttribute('class', 'product');
                        imageContainer.appendChild(imageElement);
                    }

                    // 초기 이미지 표시
                    showImage(currentIndex);

                    // 다음 이미지로 넘어가는 기능
                    document.getElementById('rightButton').addEventListener('click', function() {
                        currentIndex = (currentIndex + 1) % imageUrls.length;
                        showImage(currentIndex);
                    });

                    // 이전 이미지로 넘어가는 기능
                    document.getElementById('leftButton').addEventListener('click', function() {
                        currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
                        showImage(currentIndex);
                    });
                }
            } else {
                console.error("AJAX request failed with status: " + xhr.status);
            }
        }
    };
  
    xhr.open("POST", "get_sale_info.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
});
