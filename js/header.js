var headItem = {
    props: {
      name: String,
      pageNum: Number,
      userrole : Boolean
    },
    methods:{
        logout:function(){
            window.localStorage.clear();
            location.href = './login/loginPage.html';
        },
        mypage:function () {
            location.href = './mypage.html';
        }
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
            <button class="menuButton" onclick="location.href='myLandMark.html'" v-if="userrole">
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
            <button v-on:click="mypage">
                마이페이지
            </button>
            <button v-on:click="logout">
                로그아웃
            </button>
        </div>
   </div>
    `
  };

  var header = new Vue({
    el: '#_header',
    data: {
        name: '',
    },
    computed:{
        userrole: function(){
            var temp = window.localStorage.getItem('authrole');
            if (temp==="ROLE_ADMIN" || temp ==="ROLE_DEV"){return true;}
            else{return false;};
        }
    },
    components: {
        'header-item': headItem,
    },
    created: function() {
        const baseURI = 'http://49.50.161.45:8080/users'
        axios.get(`${baseURI}`,{
            headers: {
                'auth-token': window.localStorage.getItem('token')
            }
        })
        .then(res => { 
            authRole = res.data.authorities[0].authority;
            if(authRole != null){
                window.localStorage.setItem('authrole',authRole);
                
            }
            this.name = res.data.name;
            // console.log(this.props);
            });
    },
    })
  