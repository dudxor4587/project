<?php
session_start();
// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$db = 'user_db';
$user = 'admin';
$pass = '12345678';

// 클릭한 객체의 id 값 가져오기
$id = $_POST['id'];
$_SESSION['ID'] = $id;

if (!isset($_SESSION['user_id'])) {
    // 세션에 user_id가 없는 경우
    $response = array('success' => false, "message" => "login");
    header('Content-Type: application/json'); // JSON 데이터를 반환한다는 헤더 설정
    echo json_encode($response);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // sale_table에서 해당 id와 user_id가 일치하는 데이터 조회
    $stmt = $conn->prepare("SELECT * FROM sale_table WHERE ID = ? AND user_id = ?");
    $stmt->bind_param('ss', $id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
        // user_id와 ID가 일치하는 경우
        $response = array('success' => true);
    } else {
        // user_id와 ID가 일치하지 않는 경우
        $response = array('success' => false);
    }
    header('Content-Type: application/json'); // JSON 데이터를 반환한다는 헤더 설정
    echo json_encode($response);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
