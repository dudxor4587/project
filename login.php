<?php
session_start();
$host = 'localhost'; // 데이터베이스 호스트
$user = 'root'; // 데이터베이스 사용자 이름
$password = '1234'; // 데이터베이스 비밀번호
$database = 'user_db'; // 데이터베이스 이름

$conn = new mysqli($host, $user, $password, $database);

// 연결 오류 확인
if ($conn->connect_error) {
    die('MySQL 연결 실패: ' . $conn->connect_error);
}

// POST 데이터 가져오기
$id = $_POST['id'];
$pwd = $_POST['pwd'];

// 입력된 아이디와 비밀번호를 데이터베이스와 비교
$sql = "SELECT * FROM user_table WHERE user_id = '$id' AND user_pw = '$pwd'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $_SESSION['user_id'] = $id;

    header("Location: mainPage(login).html");
} else {
    echo "아이디 또는 비밀번호가 일치하지 않습니다.";
}

// MySQL 연결 종료
$conn->close();
?>
