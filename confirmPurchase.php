<?php
session_start();

$host = 'localhost';
$db = 'user_db';
$user = 'root';
$pass = '1234';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$buyer_id = $_POST['buyer_id']; // 구매자 ID 가져오기
echo 'POST array: ';
print_r($_POST);
$product_id = $_SESSION['ID']; // 상품 ID 가져오기

$sql = "UPDATE sale_table SET isSale = 1, purchase_user = '$buyer_id' WHERE ID = $product_id";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$delete_sql = "DELETE FROM like_table WHERE ID = $product_id";

if ($conn->query($delete_sql) === TRUE) {
    echo "Rows deleted successfully";
} else {
    echo "Error deleting rows: " . $conn->error;
}

$conn->close();
?>
