window.addEventListener('DOMContentLoaded', function() {
    // AJAX 요청으로 로그인된 사용자의 이름과 사진 가져오기
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getUserName.php', true); // getUserInfo.php는 사용자의 이름과 사진 정보를 반환하는 서버 스크립트 파일입니다.
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var nicknameElement = document.querySelector('.nickname');
            nicknameElement.innerHTML = response.nickname;

            var locationElment = document.querySelector('.location'); 
            locationElment.innerHTML = "활동지역 : " + response.location;

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
});

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
    xhr.open('POST', 'addKeyword.php', true); // saveKeyword.php는 키워드를 데이터베이스에 저장하는 서버 스크립트 파일입니다.
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('keyword=' + encodeURIComponent(keywordInput));
    alert("추가가 완료되었습니다.");
    location.reload();
});
