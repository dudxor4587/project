<?php
session_start();
// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// 데이터베이스에서 관심 상품 목록 가져오기
try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }
    $loggedInUserID = $_SESSION['user_id'];

    // 세션의 user_id와 일치하는 like_table 행의 ID 값을 가져오기
    $likeIDQuery = "SELECT ID FROM like_table WHERE user_id = '$loggedInUserID'";
    $likeIDResult = $conn->query($likeIDQuery);

    if ($likeIDResult) {
        $likeIDs = array();
        while ($row = $likeIDResult->fetch_assoc()) {
            $likeIDs[] = $row['ID'];
        }

        // like_table의 ID 값과 sale_table의 ID 값 비교하여 상품 정보 가져오기
        $saleQuery = "SELECT st.name, st.ID, (SELECT it.product_image FROM image_table it WHERE it.product_id = st.id ORDER BY it.id ASC LIMIT 1) AS product_image, st.price 
        FROM sale_table st 
        WHERE st.ID IN (SELECT ID FROM like_table WHERE user_id = '$loggedInUserID')";

        $saleResult = $conn->query($saleQuery);

        if ($saleResult) {
            $interests = array();
            while ($row = $saleResult->fetch_assoc()) {
                $interest = array(
                    'ID' => $row['ID'],
                    'name' => $row['name'],
                    'image' => $row['product_image'],
                    'price' => $row['price']
                );
                $interests[] = $interest;
            }
            $response = array('success' => true, 'interests' => $interests);
        } else {
            throw new Exception("Error executing sale query: " . $conn->error);
        }
    } else {
        throw new Exception("Error executing like ID query: " . $conn->error);
    }

    echo json_encode($response);
} catch (Exception $e) {
    $response = array('success' => false, 'error' => $e->getMessage());
    echo json_encode($response);
}

?>
