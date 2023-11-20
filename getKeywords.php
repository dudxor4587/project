<?php
session_start();
// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// 현재 사용자의 ID를 가져옵니다.
$userId = $_SESSION['user_id'];

// 데이터베이스에서 현재 사용자의 키워드를 가져옵니다.
try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // userId와 일치하는 키워드를 가져오는 SQL 쿼리를 작성합니다.
    $sql = "SELECT user_keyword FROM keyword_table WHERE user_id = '$userId'";

    // SQL 쿼리 실행
    $result = $conn->query($sql);
    if ($result) {
        $keywords = array();
        while ($row = $result->fetch_assoc()) {
            $keywords[] = $row['user_keyword'];
        }
        $response = array('success' => true, 'keywords' => $keywords);
    } else {
        throw new Exception("Error executing query: " . $conn->error);
    }

    echo json_encode($response);
} catch (Exception $e) {
    $response = array('success' => false, 'error' => $e->getMessage());
    echo json_encode($response);
}
?>
