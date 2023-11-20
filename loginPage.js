document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();
    // 입력값 가져오기
    var id = document.getElementById("id").value;
    var pwd = document.getElementById("pwd").value;

    // AJAX 요청 생성
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // 응답 처리
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                // 로그인 성공 시 처리
                if(response.redirect){
                    window.location.href="adminPage.html";
                }
                else{
                    window.location.href="mainPage(login).html";
                }
                // 로그인 성공 후 페이지 이동 또는 추가 동작 수행
            } else {
                // 로그인 실패 시 처리
                alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
        }
    };

    // 데이터 전송
    var data = "id=" + encodeURIComponent(id) + "&pwd=" + encodeURIComponent(pwd);
    xhr.send(data);
});

document.getElementById("logo").addEventListener("click",function(){
    window.location.href = "mainPage.html";
  })

  document.getElementById("signup").addEventListener("click",function(){
    window.location.href = "signinPage.html";
  });