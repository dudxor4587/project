let count = 1;
window.addEventListener('DOMContentLoaded', function() {
    var userTable = document.querySelector('.list');

    // 페이지가 로드될 때 user_table에서 값을 가져와서 테이블에 추가
    fetchUserTableData();

    function fetchUserTableData() {
        // user_table에서 값을 가져와서 테이블에 추가하는 AJAX 요청
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetchUserTableData.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    var users = response.users;
                    users.forEach(function(user) {
                        var row = document.createElement('tr');
                        var idCell = document.createElement('td');
                        var userIdCell = document.createElement('td');
                        var userNameCell = document.createElement('td');
                        var blacklistCell = document.createElement('td');
                        var blacklistButton = document.createElement('button');
                        blacklistButton.textContent = '블랙리스트 추가';

                        idCell.textContent = count++;
                        userIdCell.textContent = user.user_id;
                        userNameCell.textContent = user.name;

                        row.appendChild(idCell);
                        row.appendChild(userIdCell);
                        row.appendChild(userNameCell);

                        // 블랙리스트 추가 버튼 클릭 이벤트 처리
                        blacklistButton.addEventListener('click', function() {
                            deleteUserData(user.user_id);
                        });

                        blacklistCell.appendChild(blacklistButton);
                        row.appendChild(blacklistCell);

                        userTable.appendChild(row);
                    });
                } else {
                    console.error('user_table 데이터를 가져오는데 실패했습니다.');
                }
            }
        };
        xhr.send();
    }

    function deleteUserData(userId) {
        // user_table, keyword_table, sale_table, alarm_table, comment_table에서 user_id와 일치하는 데이터 삭제하는 AJAX 요청
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'deleteUserData.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert('블랙리스트에 등록되었습니다.');
                    location.reload();
                } else {
                    alert('블랙리스트 등록에 실패했습니다.');
                    location.reload();
                }
            }
        };
        xhr.send('user_id=' + encodeURIComponent(userId));
    }
});
document.getElementById("logout").addEventListener("click",function(event){
    window.location.href = "mainPage.html";
});