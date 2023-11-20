<?php
session_start();

// 현재 사용자 ID 가져오기
$user_id = $_SESSION['user_id'];

// 사용자로부터 전달된 키워드 받기
$keyword = $_POST['keyword'];

// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 키워드 테이블에서 해당 사용자의 키워드 삭제
$sql = "DELETE FROM keyword_table WHERE user_id = '$user_id' AND user_keyword = '$keyword'";

$response = array();
if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}

$conn->close();

// 응답을 JSON 형식으로 출력합니다.
header('Content-Type: application/json');
echo json_encode($response);
?>
