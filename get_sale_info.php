<?php
session_start();
// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// 상품의 ID 가져오기
$user_id = $_SESSION['ID'];

$viewed_products = isset($_SESSION['viewed']) ? $_SESSION['viewed'] : array();

try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // 데이터가 있는지 확인
    if (!isset($viewed_products[$user_id])) {
        // 조회수 증가
        $stmt_update_view = $conn->prepare("UPDATE sale_table SET view = view + 1 WHERE ID = ?");
        $stmt_update_view->bind_param('s', $user_id);
        $stmt_update_view->execute();
        
        // 현재 상품에 대한 조회 여부를 세션 변수에 저장
        $viewed_products[$user_id] = true;
        $_SESSION['viewed'] = $viewed_products;
    }

    // sale_table에서 해당 user_id에 해당하는 데이터 조회
    $stmt = $conn->prepare("SELECT name, price, content, date, user_id, view FROM sale_table WHERE ID = ?");
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // like_table에서 해당 user_id에 해당하는 행 개수 조회
    $stmt_like = $conn->prepare("SELECT COUNT(*) AS like_count FROM like_table WHERE ID = ?");
    $stmt_like->bind_param('s', $user_id);
    $stmt_like->execute();
    $result_like = $stmt_like->get_result();

    // 데이터가 있는지 확인
    if ($result_like->num_rows > 0) {
        $row_like = $result_like->fetch_assoc();
        // 원하는 데이터를 $response에 추가
        $response['like'] = $row_like['like_count'];
    } else {
        // 데이터가 없을 경우
        $response['like'] = 0;
    }
    // 데이터가 있는지 확인
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // user_table에서 user_id와 일치하는 행 조회
        $stmt_user = $conn->prepare("SELECT name, user_image FROM user_table WHERE user_id = ?");
        $stmt_user->bind_param('s', $row['user_id']);
        $stmt_user->execute();
        $result_user = $stmt_user->get_result();

        // 데이터가 있는지 확인
        if ($result_user->num_rows > 0) {
            $row_user = $result_user->fetch_assoc();
            // 원하는 데이터를 $response에 추가
            $response['user_name'] = $row_user['name'];
            $response['user_image'] = $row_user['user_image'];
        }

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
            $response['product_images'] = $product_images;
        } else {
            // 이미지 데이터가 없을 경우
            $response['product_images'] = null;
        }
        // 원하는 데이터를 $response에 추가
        $response['success'] = true;
        $response['name'] = $row['name'];
        $response['price'] = $row['price'];
        $response['content'] = $row['content'];
        $response['date'] = $row['date'];
        $response['view'] = $row['view'];
    } else {
        $response['success'] = false;
    }

    // JSON 형식으로 데이터 반환
    header('Content-Type: application/json');
    echo json_encode($response);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

?>
