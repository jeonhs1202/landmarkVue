Vue.component('header-item',{
    props: {
      name: String,
      pageNum: Number,
    },
    template:
     `
     <div id="_header" class="menuBack">
     <div>
         <img src="../img/logo.png" class="logoImg" onclick="location.href='main.html'">
     </div>
     <div class="buttonBar">
         <button class="menuButton" onclick="location.href='myTrip.html'">
             <img src="../img/myTravelListChecked.png" class="menuImg" v-if="pageNum=='1'">
             <img src="../img/myTravelList.png" class="menuImg" v-else>
             내 여행 보기
         </button>
         <button class="menuButton" onclick="location.href='landMarkSearch.html'">
             <img src="../img/landMarkSearchChecked.png" class="menuImg" v-if="pageNum=='2'">
             <img src="../img/landMarkSearch.png" class="menuImg" v-else>
             관광지 검색
         </button>
         <button class="menuButton" onclick="location.href='myLandMark.html'">
             <img src="../img/myLandMarkManageChecked.png" class="menuImg" v-if="pageNum=='3'">
             <img src="../img/myLandMarkManage.png" class="menuImg" v-else>
             내 관광지 관리
         </button>
         <button class="menuButton" onclick="location.href='qna.html'">
             <img src="../img/QnAChecked.png" class="menuImg" v-if="pageNum=='4'">
             <img src="../img/QnA.png" class="menuImg" v-else>
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
        name: '보현',
    }
    })
  