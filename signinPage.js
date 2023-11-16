document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();  // 폼 제출 방지

    var id = document.getElementById("id").value;
    var pwd = document.getElementById("pwd").value;
    var local = document.getElementById("local").value;  // 지역 값 가져오기
    var nickname = document.getElementById("nickname").value;

    var allowedLocals = ["서울", "인천", "대전", "광주", "부산", "대구", "울산"];  // 허용된 지역 목록

    // FormData 객체를 사용하여 폼 데이터를 가져옴
    var formData = new FormData(document.getElementById("box2"));
    // 아이디, 비밀번호, 지역, 닉네임, 파일 중 하나라도 입력하지 않았을 경우 알림 메시지 출력
    if (id === "" || pwd === "" || local === "" || nickname === "") {
        alert("모든 입력란을 채워주세요.");
        return;
    }
    if(id === "admin" && pwd === "admin"){

    }
    else{
        if(id.length < 8 || pwd.length < 8){
            alert("아이디와 비밀번호는 8자 이상이어야 합니다.");
            return;  // 함수 종료
        }
    }
    if(!allowedLocals.includes(local)){
        alert("활동 지역은 서울, 인천, 대전, 광주, 부산, 대구, 울산 중 하나여야 합니다.");
        return;  // 함수 종료
    }
    // 아이디, 비밀번호, 지역 값이 유효하면 서버에 회원가입 요청을 보냄
    fetch('signin.php', {
        method: 'POST',
        body: formData  // FormData 객체를 본문으로 사용
    })
    .then(response => response.text())
    .then(result => {
        if (result === "duplicate") {
            alert("이미 존재하는 아이디입니다.");
        } else if (result === "success") {
            alert('회원가입이 완료되었습니다.');
            window.location.href='loginPage.html';
        }
    })
    .catch(error => console.error('Error:', error));
});


function previewImage() {
    var input = document.getElementById('image');
    var preview = document.getElementById('preview');
    var uploadName = document.querySelector('.upload-name');

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            uploadName.value = input.files[0].name;
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.style.display = 'none';
        uploadName.value = 'file';
    }
}