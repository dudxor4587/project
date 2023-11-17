document.addEventListener("DOMContentLoaded", function() {
    // AJAX 요청을 사용하여 PHP 파일에서 데이터 가져오기
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'confirm.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var buyer_infos = xhr.responseText.split(';');
                var buyer_div = document.getElementById('buyer');

                for (var i = 0; i < buyer_infos.length; i++) {
                    var buyer_info = buyer_infos[i].split(',');
                    var buyer_id = buyer_info[0];
                    var buyer_name = buyer_info[1];

                    var p = document.createElement('p');
                    p.className = 'request';
                    p.textContent = buyer_name;
                
                    var input = document.createElement('input');
                    input.className = 'requestbutton';
                    input.type = 'submit';
                    input.id = 'submit';
                    input.value = 'OK';
                
                    input.dataset.buyerName = buyer_name;
                    input.dataset.buyerId = buyer_id;
                
                    buyer_div.appendChild(p);
                    buyer_div.appendChild(input);
                }
            } else {
                console.error("AJAX request failed: " + xhr.status);
            }
        }
    };
   
    xhr.send();
});

document.addEventListener('click', function(e) {
    if (e.target.className === 'requestbutton') {
        var buyer_id = e.target.dataset.buyerId;

        // AJAX 요청을 생성하고 구성합니다.
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'confirmPurchase.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log("Server response: " + xhr.responseText);
                } else {
                    console.error("AJAX request failed: " + xhr.status);
                }
            }
        };
        
        // 서버에 전달할 데이터를 구성합니다.
        // 여기서는 구매자 이름만 전달하지만, 필요하다면 상품 ID 등 다른 정보도 함께 전달할 수 있습니다.
        var data = 'buyer_id=' + encodeURIComponent(buyer_id);
        console.log(data);
        // AJAX 요청을 보냅니다.
        xhr.send(data);
    }
});