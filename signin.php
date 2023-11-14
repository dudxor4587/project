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
if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $id = $_POST['id'];
    $uploadDir = 'userImages/';
    $uploadFile = $uploadDir . basename($id . '.png');
    move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile);
} else {
    echo "파일 업로드에 오류가 발생했습니다: " . $_FILES['image']['error'];
}
// SQL 쿼리 실행하여 데이터베이스에 저장
$sql = "INSERT INTO user_table (user_id, user_pw, location, name, user_image) VALUES ('$id', '$pwd', '$local', '$nickname', '$id.png')";

if ($conn->query($sql) === TRUE) {
    
} else {
    echo "오류: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>
