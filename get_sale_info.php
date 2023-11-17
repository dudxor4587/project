<?php
session_start();
// 데이터베이스 연결 설정
$host = 'localhost';
$db = 'user_db';
$user = 'root';
$pass = '1234';

// 로그인된 사용자의 ID 가져오기
$user_id = $_SESSION['ID'];

try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // sale_table에서 해당 user_id에 해당하는 데이터 조회
    $stmt = $conn->prepare("SELECT name, price, content, date FROM sale_table WHERE ID = ?");
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    // 데이터가 있는지 확인
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        
        // image_table에서 product_id와 일치하는 모든 행 조회
        $stmt_image = $conn->prepare("SELECT product_image FROM image_table WHERE product_id = ?");
        $stmt_image->bind_param('s', $user_id);
        $stmt_image->execute();
        $result_image = $stmt_image->get_result();
        
        // 이미지 데이터가 있는지 확인
        if ($result_image->num_rows > 0) {
            $product_images = array();
            while ($row_image = $result_image->fetch_assoc()) {
                $product_images[] = $row_image['product_image'];
            }
            // 원하는 데이터를 $response에 추가
            $response = array(
                'success' => true,
                'name' => $row['name'],
                'price' => $row['price'],
                'content' => $row['content'],
                'date' => $row['date'],
                'product_images' => $product_images
            );
        } else {
            // 이미지 데이터가 없을 경우
            $response = array(
                'success' => true,
                'name' => $row['name'],
                'price' => $row['price'],
                'date' => $row['date'],
                'content' => $row['content'],
                'date' => $row['date'],
                'product_images' => null
            );
        }
    } else {
        $response = array(
            'success' => false
        );
    }

    // JSON 형식으로 데이터 반환
    header('Content-Type: application/json');
    echo json_encode($response);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
