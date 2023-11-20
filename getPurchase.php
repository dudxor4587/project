<?php
session_start();
// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// 데이터베이스에서 상품 정보 가져오기
try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }
    $loggedInUserID = $_SESSION['user_id'];
    // 상품 정보를 가져오는 SQL 쿼리를 작성합니다.

    $sql = "SELECT st.name, st.ID, st.isSale, (SELECT it.product_image FROM image_table it WHERE it.product_id = st.id ORDER BY it.id ASC LIMIT 1) AS product_image, st.price FROM sale_table st WHERE st.purchase_user = '$loggedInUserID'";


// SQL 쿼리 실행
$result = $conn->query($sql);
if ($result) {
    $products = array();
    while ($row = $result->fetch_assoc()) {
        $product = array(
            'ID' => $row['ID'],
            'name' => $row['name'],
            'image' => $row['product_image'],
            'price' => $row['price'],
            'isSale' => $row['isSale']  
        );
            $products[] = $product;
        }
        $response = array('success' => true, 'purchases' => $products);
    } else {
        throw new Exception("Error executing query: " . $conn->error);
    }

    echo json_encode($response);
} catch (Exception $e) {
    $response = array('success' => false, 'error' => $e->getMessage());
    echo json_encode($response);
}
?>
