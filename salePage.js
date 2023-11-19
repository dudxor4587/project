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
                        alert("모든 값을 채워주세요.");
                    }
                }
            }
        };
        xhr.send(formData);
    });
});
document.getElementById("logout").addEventListener("click", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "logout.php", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 로그아웃 후 처리
        window.location.href = "mainPage.html";
      }
    };
    xhr.send();
  });
  document.getElementById("mypage").addEventListener("click", function(){
    window.location.href = "myPage.html";
});
document.getElementById("logo").addEventListener("click",function(){
    window.location.href = "mainPage(login).html";
  })

  document.getElementById("bell").addEventListener("click", function(event) {
    var alarmElement = document.getElementById("alarm");
    if (alarmElement.style.display === "none") {
      alarmElement.style.display = "block";
  
      // 알림 창 내부 초기화
      alarmElement.innerHTML = "";
  
      // AJAX 요청으로 현재 로그인된 사용자의 키워드 가져오기
      var xhrKeywords = new XMLHttpRequest();
      xhrKeywords.open("GET", "getAlarm.php", true);
      xhrKeywords.onreadystatechange = function() {
        if (xhrKeywords.readyState === 4) {
          if (xhrKeywords.status === 200) {
            var responseKeywords = JSON.parse(xhrKeywords.responseText);
  
            if (responseKeywords.success) {
              var keywords = responseKeywords.keywords;
              keywords.reverse();
              keywords.forEach(function(keyword) {
                // 키워드를 알림 창 내부에 추가하는 코드를 작성합니다.
                var keywordElement = document.createElement("div");
                keywordElement.classList.add("keyword");
                if(keyword.check_ok == 1){
                    keywordElement.innerHTML =
                  "'" +
                  keyword.keyword +
                  "' 키워드 관련 새 글이 있습니다.<br>(" +
                  formatTimeAgo(keyword.minutes_ago) + "(읽음)";
                }
                else{
                    keywordElement.innerHTML =
                  "'" +
                  keyword.keyword +
                  "' 키워드 관련 새 글이 있습니다.<br>(" +
                  formatTimeAgo(keyword.minutes_ago);
                }
                  keywordElement.addEventListener("click", function() {
                    updateKeywordCheck(keyword.keyword);
                    var searchInput = keyword.keyword.trim();
                    sessionStorage.setItem("searchValue", searchInput);
                    sessionStorage.setItem("locationValue", "전체");

                    // 페이지 리다이렉션
                    window.location.href = "mainPage(login).html";
                  });
                  function formatTimeAgo(minutes) {
                    if (minutes < 60) {
                      return minutes + "분 전)";
                    } else {
                        return Math.floor(minutes / 60) + "시간 전)";
                    }
                  }
                alarmElement.appendChild(keywordElement);
              });
            } else {
              var keywordElement = document.createElement("div");
              keywordElement.classList.add("keyword2");
              keywordElement.textContent = "키워드 관련 새 글이 없습니다.";
              alarmElement.appendChild(keywordElement);
            }
          } else {
            console.error("응답 상태가 성공이 아닙니다.");
          }
        }
      };
      xhrKeywords.send();
    } else {
      alarmElement.style.display = "none";
    }
  });
  function updateKeywordCheck(keywordId) {
    // AJAX 요청으로 키워드의 check 값을 1로 업데이트하는 함수
    var xhrUpdateCheck = new XMLHttpRequest();
    xhrUpdateCheck.open("POST", "updateCheck.php", true);
    xhrUpdateCheck.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrUpdateCheck.onreadystatechange = function() {
      if (xhrUpdateCheck.readyState === 4 && xhrUpdateCheck.status === 200) {
        var responseUpdateCheck = JSON.parse(xhrUpdateCheck.responseText);
        if (responseUpdateCheck.success) {
          // 업데이트 성공 처리
          console.log("키워드의 check 값을 업데이트했습니다.");
        } else {
          // 업데이트 실패 처리
          console.error("키워드의 check 값을 업데이트하는데 실패했습니다.");
        }
      }
    };
    xhrUpdateCheck.send("keywordId=" + encodeURIComponent(keywordId));
  }