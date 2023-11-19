<?php
// 데이터베이스 연결 설정
$host = 'localhost';
$dbname = 'user_db';
$username = 'root';
$password = '1234';

$user_id = $_POST['user_id'];

try {
    $conn = new mysqli($host, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("데이터베이스 연결 실패: " . $conn->connect_error);
    }
    // user_table에서 user_id와 일치하는 데이터 삭제
    $stmt = $conn->prepare("DELETE FROM user_table WHERE user_id = ?");
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    echo json_encode(array('success' => true, 'message' => '데이터 삭제 성공'));
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'message' => '데이터베이스 오류: ' . $e->getMessage()));
}

$conn->close();
?>
