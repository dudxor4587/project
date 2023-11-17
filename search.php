<?php
// 데이터베이스 연결 설정
$host = 'localhost';
$db = 'user_db';
$user = 'root';
$pass = '1234';

// 데이터베이스에서 상품 정보 가져오기
try {
    $conn = new mysqli($host, $user, $pass, $db);
    if ($conn->connect_errno) {
        throw new Exception("Failed to connect to MySQL: " . $conn->connect_error);
    }

    // 입력된 검색어, 최소값, 최대값, 위치 가져오기
    $search = $_GET['search'];
    $min = $_GET['min'];
    $max = $_GET['max'];
    $location = $_GET['location'];

    // 상품 정보와 사용자 위치를 가져오는 SQL 쿼리를 작성합니다.
    $sql = "SELECT st.name, st.ID, (SELECT it.product_image FROM image_table it WHERE it.product_id = st.id ORDER BY it.id ASC LIMIT 1) AS product_image, st.price, ut.location
            FROM sale_table st
            INNER JOIN user_table ut ON st.user_id = ut.user_id
            WHERE 1=1";

    // 검색어가 있는 경우 검색 조건에 추가합니다.
    if (!empty($search)) {
        $searchTerms = explode(' ', $search);
        $searchConditions = array();
        foreach ($searchTerms as $term) {
            $term = trim($term);
            if (!empty($term)) {
                $term = str_replace(' ', '', $term); // 검색어 내의 공백 제거
                $searchConditions[] = "REPLACE(st.name, ' ', '') LIKE '%$term%'";
            }
        }
        if (!empty($searchConditions)) {
            $sql .= " AND (" . implode(' OR ', $searchConditions) . ")";
        }
    }

    // 최소값이 있는 경우 검색 조건에 추가합니다.
    if (!empty($min)) {
        $min = str_replace(',', '', $min); // 쉼표 제거
        $sql .= " AND REPLACE(st.price, ',', '') >= $min";
    }

    // 최대값이 있는 경우 검색 조건에 추가합니다.
    if (!empty($max)) {
        $max = str_replace(',', '', $max); // 쉼표 제거
        $sql .= " AND REPLACE(st.price, ',', '') <= $max";
    }

    // 위치가 "전체"가 아닌 경우에만 검색 조건에 추가합니다.
    if ($location !== "전체") {
        $sql .= " AND ut.location = '$location'";
    }

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
                'location' => $row['location']
            );
            $products[] = $product;
        }
        $response = array('success' => true, 'products' => $products);
    } else {
        throw new Exception("Error executing query: " . $conn->error);
    }

    echo json_encode($response);
} catch (Exception $e) {
    $response = array('success' => false, 'error' => $e->getMessage());
    echo json_encode($response);
}
?>
