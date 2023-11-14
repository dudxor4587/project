window.addEventListener('DOMContentLoaded', function() {
    // AJAX 요청으로 로그인된 사용자의 이름과 사진 가져오기
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getUserName.php', true); // getUserInfo.php는 사용자의 이름과 사진 정보를 반환하는 서버 스크립트 파일입니다.
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.querySelector('.nickname').textContent = response.nickname;
            var userImageElement = document.querySelector('.user-image');
            userImageElement.style.backgroundImage = 'url(userImages/' + response.image + ')';
            userImageElement.style.backgroundSize = 'cover';
        }
    };
    xhr.send();
});

document.getElementById("mypage").addEventListener("click", function(){
    window.location.href = "myPage.html";
});

document.getElementById("logout").addEventListener("click", function(){
    window.location.href = "mainPage.html";
});
