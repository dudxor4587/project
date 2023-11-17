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
  
   // 로그아웃 버튼 클릭 이벤트
 document.getElementById("logout").addEventListener("click", function(){
    window.location.href = "mainPage.html";
});

// 마이페이지 버튼 클릭 이벤트
document.getElementById("mypage").addEventListener("click", function(){
    window.location.href = "myPage.html";
});