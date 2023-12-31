<?php
session_start();

// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// 세션에서 상품 ID와 현재 사용자 ID 가져오기
$product_id = $_SESSION['ID']; // 상품 ID
$current_user_id = $_SESSION['user_id']; // 현재 사용자 ID


try {
    $conn = new mysqli($host, $user, $pass, $db);
    
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // sale_table에서 해당 상품 ID의 판매자 ID(sale_id) 조회
    $stmt_sale = $conn->prepare("SELECT user_id FROM sale_table WHERE ID = ?");
    $stmt_sale->bind_param('i', $product_id);
    $stmt_sale->execute();
    $result_sale = $stmt_sale->get_result();

    if ($result_sale->num_rows == 0) {
        die("Invalid user ID.");
    }

    if ($result_sale->num_rows > 0) {
        $row_sale = $result_sale->fetch_assoc();
        $sale_id = $row_sale['user_id']; // 판매자 ID
        // request_table에 product_id, current_user_id, sale_id 저장
        // request_table에서 해당 조건을 만족하는 행이 있는지 확인
        $stmt_check = $conn->prepare("SELECT * FROM request_table WHERE buy_id = ? AND sale_id = ? AND ID = ?");
        $stmt_check->bind_param('ssi', $current_user_id, $sale_id, $product_id);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();

        if ($result_check->num_rows > 0) {
        // 이미 해당 조건을 만족하는 행이 존재하는 경우
        $response = array('success' => false);
        } else {
        // 해당 조건을 만족하는 행이 존재하지 않는 경우, 새로운 행 추가
        $stmt_request = $conn->prepare("INSERT INTO request_table (buy_id, sale_id, ID) VALUES (?, ?, ?)");
        $stmt_request->bind_param('ssi', $current_user_id, $sale_id, $product_id);
        $stmt_request->execute();

            if ($stmt_request->affected_rows > 0) {
                $response = array('success' => true);
            } else {
                $response = array('success' => false);
            }
        }
    } else {
        $response = array('success' => false);
    }
    echo json_encode($response);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
