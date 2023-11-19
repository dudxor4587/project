<?php
session_start();

$host = 'localhost';
$db = 'user_db';
$user = 'root';
$pass = '1234';
// 데이터베이스 연결
$conn = new mysqli($host, $user, $pass, $db);

// 연결 오류 확인
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 현재 상품 ID
$current_product_id = $_SESSION['ID'];  // 상품 ID는 URL의 query string에서 가져올 수 있습니다.
// 구매자 ID 목록 가져오기
$result = $conn->query("SELECT buy_id FROM request_table WHERE ID = $current_product_id");

// 구매자 정보 목록
$buyer_infos = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $buyer_id = $row['buy_id'];
        $buyer_result = $conn->query("SELECT name FROM user_table WHERE user_id = '$buyer_id'");

        if ($buyer_row = $buyer_result->fetch_assoc()) {
            // 사용자 ID와 이름을 콤마로 구분하여 저장
            $buyer_info = $buyer_id . ',' . $buyer_row['name'];
            $buyer_infos[] = $buyer_info;
        }
    }
}

// 세션에 구매자 정보 목록 저장
$buyer_infos_string = implode(';', $buyer_infos);
$_SESSION['buyer_infos'] = $buyer_infos_string;

// 응답 데이터 설정
$response = array();
if ($result->num_rows > 0) {
    $response['success'] = true;
    $response['buyer_infos'] = $buyer_infos_string;
} else {
    $response['success'] = false;
}

// 응답 데이터 출력
echo json_encode($response);

$conn->close();

?>
