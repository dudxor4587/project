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
if (isset($_SESSION['viewed'])) {
    unset($_SESSION['viewed']);
}
// POST 데이터 가져오기
$id = $_POST['id'];
$pwd = $_POST['pwd'];

// 입력된 아이디와 비밀번호를 데이터베이스와 비교
if($id === "admin" && $pwd === "admin"){
    // 관리자 로그인인 경우
    $response = array('success' => true, 'redirect' => 'adminPage.html');
} else {
    $sql = "SELECT * FROM user_table WHERE user_id = '$id' AND user_pw = '$pwd'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['user_id'] = $id;
        $response = array('success' => true);
    } else {
        $response = array('success' => false);
    }
}

// JSON 형식으로 데이터 반환
header('Content-Type: application/json');
echo json_encode($response);

// MySQL 연결 종료
$conn->close();
?>
