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

// 현재 로그인된 사용자의 아이디 가져오기
if (isset($_SESSION['user_id'])) {
    $loggedInUserID = $_SESSION['user_id'];

    $sql = "SELECT name,location,user_image FROM user_table WHERE user_id = '$loggedInUserID'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response = array(
            'nickname' => $row['name'],
            'image' => $row['user_image'],
            'location' => $row['location']
        );
        echo json_encode($response);
    } else {
        echo "사용자를 찾을 수 없습니다.";
    }
} else {
    echo "로그인이 필요합니다.";
}

// MySQL 연결 종료
$conn->close();
?>
