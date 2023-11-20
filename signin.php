<?php
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com'; // 데이터베이스 호스트
$user = 'admin'; // 데이터베이스 사용자 이름
$password = '12345678'; // 데이터베이스 비밀번호
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

// 아이디 중복 체크
$checkQuery = "SELECT * FROM user_table WHERE user_id = '$id'";
$result = $conn->query($checkQuery);
if ($result->num_rows > 0) {
    echo "duplicate";
    exit;  // 스크립트 종료
}

// 이미지 업로드
if ($_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'userImages/';
    $uploadFile = $uploadDir . basename($id . '.png');
    move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile);
    $sql = "INSERT INTO user_table (user_id, user_pw, location, name, user_image) VALUES ('$id', '$pwd', '$local', '$nickname', '$id.png')";
} else {
    $sql = "INSERT INTO user_table (user_id, user_pw, location, name, user_image) VALUES ('$id', '$pwd', '$local', '$nickname', '기본프로필.png')";
}

if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "오류: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
