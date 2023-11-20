<?php
session_start();
// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// 현재 로그인된 사용자의 user_id 가져오기
$loggedInUserId = $_SESSION['user_id'];

// 전달받은 keywordId 값 가져오기
$keywordId = $_POST['keywordId'];

// 데이터베이스에 연결
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_errno) {
    die("Failed to connect to MySQL: " . $conn->connect_error);
}

// 사용자의 키워드 중 맨 위의 하나의 check 값을 1로 업데이트
$updateSql = "UPDATE alarm_table SET check_ok = 1 WHERE user_id = '$loggedInUserId' AND keyword = '$keywordId'";
if ($conn->query($updateSql) === TRUE) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false));
}

$conn->close();
?>
