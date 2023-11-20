<?php
session_start();
// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// POST 요청으로부터 키워드 값 가져오기
$keyword = $_POST['keyword'];

// 데이터베이스에 키워드 저장
try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // 현재 사용자의 ID와 키워드를 데이터베이스에 저장
    $userId = $_SESSION['user_id']; // 사용자 ID를 적절히 설정해야 합니다.
    $sql = "INSERT INTO keyword_table (user_id, user_keyword) VALUES ('$userId','$keyword')";

    // SQL 쿼리 실행
    if ($conn->query($sql) === TRUE) {
        $response = array('success' => true);
    } else {
        throw new Exception("Error executing query: " . $conn->error);
    }

    echo json_encode($response);
} catch (Exception $e) {
    $response = array('success' => false, 'error' => $e->getMessage());
    echo json_encode($response);
}

?>
