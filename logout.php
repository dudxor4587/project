<?php
session_start();

// 모든 세션 변수 제거
$_SESSION = array();

// 세션 삭제
session_destroy();

// 응답 전송
http_response_code(200);
?>
