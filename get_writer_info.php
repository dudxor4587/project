<?php
session_start();
// 데이터베이스 연결 설정
$host = 'localhost';
$db = 'user_db';
$user = 'root';
$pass = '1234';

$product_id = $_SESSION['ID'];

try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // comment_table에서 product_id에 해당하는 모든 댓글 조회
    $stmt = $conn->prepare("SELECT writer_id, comment, date FROM comment_table WHERE product_id = ?");
    $stmt->bind_param('s', $product_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $comments = array();
    while ($row = $result->fetch_assoc()) {
        $writer_id = $row['writer_id'];

        // user_table에서 작성자 정보 조회
        $stmt2 = $conn->prepare("SELECT name, user_image FROM user_table WHERE user_id = ?");
        $stmt2->bind_param('s', $writer_id);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        $row2 = $result2->fetch_assoc();

        if ($row2) {
            $comments[] = array(
                'writer_id' => $writer_id,
                'comment' => $row['comment'],
                'date' => $row['date'],
                'name' => $row2['name'],
                'user_image' => $row2['user_image']
            );
        }
    }

    if (!empty($comments)) {
        $response = array(
            'success' => true,
            'comments' => $comments
        );
    } else {
        // 댓글 정보가 없는 경우
        $response = array('success' => false);
    }

    header('Content-Type: application/json'); // JSON 데이터를 반환한다는 헤더 설정
    echo json_encode($response);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
