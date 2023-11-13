window.addEventListener('DOMContentLoaded', function() {
    // AJAX 요청으로 로그인된 사용자의 이름 가져오기
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'getUserName.php', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            document.querySelector('.nickname').textContent = response;
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

