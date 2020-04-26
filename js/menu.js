Vue.component('menu-item', {
    template: 
    `<div class="menuBack">
        <img src="../img/logo.png" class="logoImg">
        <button class="menuButton">
            <img src="../img/myTravelList.png" class="menuImg">
            내 여행 보기
        </button>
        <button class="menuButton">
            <img src="../img/landMarkSearch.png" class="menuImg">
            관광지 검색
        </button>
        <button class="menuButton">
            <img src="../img/myLandMarkManage.png" class="menuImg">
            내 관광지 관리
        </button>
        <button class="menuButton">
            <img src="../img/QnA.png" class="menuImg">
            문의 사항
        </button>
    </div>`
  })

var menu = new Vue({
    el: '#_menu',
    data: {
      message: '안녕하세요 hyesun!'
    }
  })
  