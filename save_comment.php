<?php
session_start();
// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// 전달된 데이터 가져오기
$comment = $_POST['comment'];
$writer_id = $_SESSION['user_id'];
$product_id = $_SESSION['ID'];
$date = date('Y-m-d H:i A');

try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // comment_table에 데이터 삽입
    $stmt = $conn->prepare("INSERT INTO comment_table (product_id, writer_id, comment, date) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('ssss', $product_id, $writer_id, $comment, $date);
    $stmt->execute();

    // 성공적으로 데이터 삽입 완료
    http_response_code(200);
    echo "댓글이 성공적으로 저장되었습니다.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
