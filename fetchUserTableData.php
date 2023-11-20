<?php
// user_table에서 데이터를 가져와서 JSON 형식으로 반환하는 코드

// 데이터베이스 연결 설정
$host = 'web-db.cwszvyl8uzql.ap-southeast-2.rds.amazonaws.com';
$dbname = 'user_db';
$username = 'admin';
$password = '12345678';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // user_table에서 데이터를 가져오는 쿼리 실행
    $stmt = $conn->prepare("SELECT * FROM user_table WHERE user_id != 'admin'");
    $stmt->execute();

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // JSON 형식으로 데이터 반환
    echo json_encode(array('success' => true, 'users' => $users));
} catch(PDOException $e) {
    echo json_encode(array('success' => false, 'message' => '데이터베이스 오류: ' . $e->getMessage()));
}
?>
