window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit').addEventListener('click', function(event) {
        event.preventDefault(); // 폼의 기본 동작인 페이지 이동을 막습니다.

        // 입력된 값들을 가져옵니다.
        var title = document.getElementById('title').value;
        var price = document.getElementById('price').value;
        var detail = document.getElementById('detail').value;
        var images = document.getElementById('image').files;

        // FormData 객체를 생성하고 입력된 값들을 추가합니다.
        var formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('detail', detail);
        for (var i = 0; i < images.length; i++) {
            formData.append('image[]', images[i]);
        }

        // AJAX 요청을 생성하고 sale.php로 전송합니다.
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'sale.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                if (response === "imagecount") {
                    alert("사진은 10개까지만 등록할 수 있습니다.");
                } else {
                    try {
                        var responseData = JSON.parse(response);
                        if (responseData.success) {
                            // 성공적으로 데이터베이스에 저장되었을 경우 처리할 로직을 작성합니다.
                            alert('물건 판매글이 등록되었습니다.');
                            // 페이지 이동 등의 로직을 추가합니다.
                            window.location.href = "mainPage(login).html";
                        } else {
                            alert(responseData.error);
                        }
                    } catch (error) {
                        console.error("JSON 파싱 오류:", error);
                    }
                }
            }
        };
        xhr.send(formData);
    });
});
