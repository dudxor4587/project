<?php
session_start();
// 데이터베이스 연결 설정
$host = 'localhost';
$db = 'user_db';
$user = 'root';
$pass = '1234';

// 현재 로그인된 사용자의 user_id 가져오기
$loggedInUserId = $_SESSION['user_id'];

// 데이터베이스에 연결
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_errno) {
    die("Failed to connect to MySQL: " . $conn->connect_error);
}

// 현재 시간 구하기
$currentDateTime = date("Y-m-d H:i:s");

// keyword_table에서 현재 로그인된 사용자의 user_id와 일치하는 행을 가져옵니다.
$keywordSql = "SELECT keyword, create_time, check_ok FROM alarm_table WHERE user_id = '$loggedInUserId'";
$keywordResult = $conn->query($keywordSql);
if ($keywordResult->num_rows > 0) {
    $keywords = array();
    while ($keywordRow = $keywordResult->fetch_assoc()) {
        $keyword = $keywordRow['keyword'];
        $createdAt = $keywordRow['create_time'];
        $checked = $keywordRow['check_ok'];
        // 현재 시간과 저장된 시간의 차이 계산
        $timeDiff = strtotime($currentDateTime) - strtotime($createdAt);
        $minutesAgo = round($timeDiff / 60);

        $keywords[] = array(
            'keyword' => $keyword,
            'minutes_ago' => $minutesAgo,
            'check_ok' => $checked
        );
    }
    echo json_encode(array('success' => true, 'keywords' => $keywords, 'minutes_ago' => $minutesAgo, 'check_ok' => $checked));
} else {
    echo json_encode(array('success' => false));
}


?>
