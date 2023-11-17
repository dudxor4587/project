 // 로그아웃 버튼 클릭 이벤트
 document.getElementById("logout").addEventListener("click", function(){
    window.location.href = "mainPage.html";
});

// 마이페이지 버튼 클릭 이벤트
document.getElementById("mypage").addEventListener("click", function(){
    window.location.href = "myPage.html";
});

document.getElementById("buyBtn").addEventListener("click", function(){
    window.location.href = "requestPage.html";
});



// LIKE 버튼 클릭 이벤트
document.getElementById("like").addEventListener("submit", function(e){
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // 성공적으로 좋아요 처리됐을 때의 동작
                    alert("관심내역에 등록되었습니다.");
                } else if(response.message == "exist"){
                    alert("관심내역에서 해제되었습니다.");
                } else {
                    // 좋아요 처리 실패 시의 동작
                    alert("로그인 후 이용해주세요.");
                }
            }
             else {
                console.error("AJAX request failed with status: " + xhr.status);
            }
        }
    }
    xhr.open("POST", "like.php", true);
    xhr.send();
});
document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); // 폼 기본 동작 방지
  
    // 입력한 텍스트 가져오기
    var comment = document.getElementById("textarea").value;
  
    // AJAX 요청을 사용하여 PHP 파일에 데이터 전달
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            alert("작성되었습니다.");
            location.reload();
        } else {
          console.error("AJAX request failed with status: " + xhr.status);
        }
      }
    };
    xhr.open("POST", "save_comment.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("comment=" + encodeURIComponent(comment));
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

                    // 세션에 있는 ID 값을 이용하여 작성자 정보 가져오기
                    var writerId = response.writer_id;
                    var xhr2 = new XMLHttpRequest();
                    xhr2.onreadystatechange = function() {
                        if (xhr2.readyState === XMLHttpRequest.DONE) {
                            if (xhr2.status === 200) {
                                var userResponse = JSON.parse(xhr2.responseText);
                                if (userResponse.success) {
                                    var comments = userResponse.comments;
                                    var commentBox = document.querySelector(".chatBox_list-user");
                                    for (var i = 0; i < comments.length; i++) {
                                        var commentImage = document.createElement('div');
                                        commentImage.classList.add('comment-image');
                                        commentImage.style.backgroundImage = 'url(userImages/' + comments[i].user_image + ')';
                                        commentImage.style.backgroundSize = 'cover';

                                        var commentDate = document.createElement('div');
                                        commentDate.classList.add('comment-date');
                                        commentDate.textContent = comments[i].date;

                                        var comment = document.createElement('div');
                                        comment.classList.add('comment');
                                        comment.textContent = comments[i].comment;

                                        var commentTitle = document.createElement('div');
                                        commentTitle.classList.add('comment-name');
                                        commentTitle.textContent = comments[i].name;

                                        var commentContainer = document.createElement('div');
                                        var commentContainer2 = document.createElement('div');
                                        commentContainer2.classList.add('comment-container2');
                                        commentContainer.classList.add('comment-container');
                                        commentTitle.appendChild(commentDate);
                                        commentContainer.appendChild(commentImage);
                                        commentContainer2.appendChild(commentTitle);
                                        commentContainer2.appendChild(comment);
                                        commentContainer.appendChild(commentContainer2);
                                        commentBox.appendChild(commentContainer);
                                    }
                                }
                                
                            } else {
                                console.error("AJAX request failed with status: " + xhr2.status);
                            }
                        }
                    };
                    xhr2.open("POST", "get_writer_info.php", true);
                    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr2.send();
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


// 페이지 로드 시 데이터 가져오기
document.addEventListener("DOMContentLoaded", function() {
    // AJAX 요청을 사용하여 PHP 파일에서 데이터 가져오기
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var infoBox = document.querySelector('.infoBox1');
                if (response.success) {
                    // 이름, 가격, 내용을 가져와서 원하는 위치에 적용
                    var nameElement = document.querySelector('.infoBox_bar2-name');
                    var priceElement = document.querySelector('.priceBox');
                    var contentElement = document.querySelector('.contentBox');
                    var imageContainer = document.querySelector('.image_box');
                    var date = document.querySelector('.date');

                    nameElement.textContent = response.name;
                    date.textContent = response.date;
                    priceElement.textContent = response.price + " 원";
                    contentElement.tsextContent = response.content;

                    var infoImage = document.createElement('div');
                    infoImage.classList.add('infoImage');
                    infoImage.style.backgroundImage = 'url(userImages/' + response.user_image + ')';
                    infoImage.style.backgroundSize = 'cover';

                    // 상품 제목을 가져와서 요소를 생성합니다.
                    var infoName = document.createElement('div');
                    infoName.classList.add('infoName');
                    infoName.textContent = response.user_name;

                    // 상품 이미지와 제목을 감싸는 컨테이너 요소를 생성합니다.
                    var infoContainer = document.createElement('div');
                    infoContainer.classList.add('info-container');
                    infoContainer.appendChild(infoImage);
                    infoContainer.appendChild(infoName);

                    infoBox.appendChild(infoContainer);
                    // product_images의 모든 값에 "productImages/"를 추가하여 이미지 요소 생성
                    response.product_images.forEach(function(imageUrl) {
                        var imageElement = document.createElement('img');
                        imageElement.style.backgroundImage = 'url(userImages/' + imageUrl + ')';
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

