<?php
session_start();
// 데이터베이스 연결 설정
$host = 'localhost';
$db = 'user_db';
$user = 'root';
$pass = '1234';

// POST 요청으로부터 입력된 값들 가져오기
$title = $_POST['title'];
$price = $_POST['price'];
$detail = $_POST['detail'];
$images = $_FILES['image'];

// 공백 제거
$titleWithoutSpace = str_replace(' ', '', $title);

// 데이터베이스에 판매글 저장
try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // 현재 사용자의 ID를 가져옵니다.
    $userId = $_SESSION['user_id'];

    // 이미지 파일 개수 확인
    $numImages = count($_FILES['image']['name']);

    if ($numImages > 10) {
        echo "imagecount";
        exit;
    }

    // 현재 시간을 가져옵니다.
    $date = date('Y/m/d');

    $formattedPrice = number_format($price);

    // 데이터베이스에 판매글 정보를 저장합니다.
    $sql = "INSERT INTO sale_table (user_id, name, price, date, content) VALUES ('$userId', '$title', '$formattedPrice', '$date', '$detail')";
    if ($conn->query($sql) === TRUE) {
        // 새로 생성된 판매글의 ID를 가져옵니다.
        $saleId = $conn->insert_id;

        // 이미지 파일을 업로드하고 image_table에 저장합니다.
        for ($i = 0; $i < $numImages; $i++) {
            $imageSql = "INSERT INTO image_table (product_id, product_image) VALUES ('$saleId', '')";
            if ($conn->query($imageSql) === TRUE) {
                $imageId = $conn->insert_id;
                $imageName = $imageId . '.png';
                $imageSql = "UPDATE image_table SET product_image = '$imageName' WHERE id = '$imageId'";
                $conn->query($imageSql);
                $imagePath = 'productImages/' . $imageName;
                move_uploaded_file($images['tmp_name'][$i], $imagePath);
            }
        }

        // keyword_table에서 user_keyword와 비교하여 제목이 키워드를 포함하는지 확인
        $keywordSql = "SELECT user_id, user_keyword FROM keyword_table WHERE '$titleWithoutSpace' LIKE CONCAT('%', user_keyword, '%')";
        $keywordResult = $conn->query($keywordSql);
        if ($keywordResult->num_rows > 0) {
            while ($keywordRow = $keywordResult->fetch_assoc()) {
                $keywordUserId = $keywordRow['user_id'];
                $keyword = $keywordRow['user_keyword'];
                $currentDateTime = date("Y-m-d H:i:s"); // 현재 시간
                // 데이터베이스에 키워드와 현재 시간 저장
                $insertSql = "INSERT INTO alarm_table (user_id, keyword, create_time) VALUES ('$keywordUserId', '$keyword', '$currentDateTime')";
                $conn->query($insertSql);
            }
        }

        $response = array('success' => true);
        echo json_encode($response);
    } else {
        throw new Exception("물건 판매글 등록에 실패했습니다.");
    }
} catch (Exception $e) {
    $response = array('success' => false, 'error' => $e->getMessage());
    echo json_encode($response);
}
?>
