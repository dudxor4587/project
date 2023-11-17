<?php
// 세션 시작
session_start();

// 세션에서 user_id 가져오기
$user_id = $_SESSION['user_id'];

// POST 데이터에서 게시글 id 가져오기
$id = $_SESSION['ID'];

// 데이터베이스 연결
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "user_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

// 이미 해당 ID와 KEY 값이 like_table에 존재하는지 확인
$checkQuery = "SELECT * FROM like_table WHERE user_id = '$user_id' AND ID = '$id'";
$result = $conn->query($checkQuery);

if ($result->num_rows > 0) {
    // 이미 해당 ID와 KEY 값이 존재하는 경우
    
    // 이미 존재하는 값을 삭제
    $deleteQuery = "DELETE FROM like_table WHERE user_id = '$user_id' AND ID = '$id'";
    $conn->query($deleteQuery);
    $response = array("success" => false, "message" => "exist");
} else {
    // like_table에 데이터 추가하기
    $sql = "INSERT INTO like_table (user_id, ID) VALUES ('$user_id', '$id')";
    if ($conn->query($sql) === TRUE) {
        $response = array("success" => true);
    } else {
        $response = array("success" => false, "message" => "failed to insert");
    }
}

// 응답 데이터 전송
echo json_encode($response);

// 데이터베이스 연결 종료
$conn->close();
?>
