<?php
$host = 'localhost'; // 데이터베이스 호스트
$user = 'root'; // 데이터베이스 사용자 이름
$password = '1234'; // 데이터베이스 비밀번호
$database = 'user_db'; // 데이터베이스 이름

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die('MySQL 연결 실패: ' . $conn->connect_error);
}

// POST 데이터 가져오기
$id = $_POST['id'];
$pwd = $_POST['pwd'];
$local = $_POST['local'];
$nickname = $_POST['nickname'];

// SQL 쿼리 실행하여 데이터베이스에 저장
$sql = "INSERT INTO user_table (user_id, user_pw, location, name) VALUES ('$id', '$pwd', '$local', '$nickname')";

if ($conn->query($sql) === TRUE) {
    echo "회원가입이 완료되었습니다.";
} else {
    echo "오류: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>
