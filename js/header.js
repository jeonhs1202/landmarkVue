Vue.component('header-item',{
    props: ['name'],
    template:
     `
     <div id="_header" class="menuBack">
     <div>
         <img src="../img/logo.png" class="logoImg" onclick="location.href='main.html'">
     </div>
     <div class="buttonBar">
         <button class="menuButton" onclick="location.href='myTrip.html'">
             <img src="../img/myTravelList.png" class="menuImg">
             내 여행 보기
         </button>
         <button class="menuButton" onclick="location.href='landMarkSearch.html'">
             <img src="../img/landMarkSearch.png" class="menuImg">
             관광지 검색
         </button>
         <button class="menuButton" onclick="location.href='myLandMark.html'">
             <img src="../img/myLandMarkManage.png" class="menuImg">
             내 관광지 관리
         </button>
         <button class="menuButton" onclick="location.href='qna.html'">
             <img src="../img/QnA.png" class="menuImg">
             문의 사항
         </button>
     </div>
     <div class="login">
         {{ name }} 님 안녕하세요!
         <button>
             마이페이지
         </button>
         <button>
             로그아웃
         </button>
     </div>
   </div>
    `
  })

  var header = new Vue({
    el: '#_header',
    data: {
        name: '혜선'
    }
    })
  