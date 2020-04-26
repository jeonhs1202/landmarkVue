Vue.component('login-item', {
    props: ['name'],
    template: 
    `<div>
        {{name}}님 안녕하세요!
        <button>
            마이페이지
        </button>
        <button>
            로그아웃
        </button>
    </div>`
  })

var login = new Vue({
el: '#_login',
data: {
    name: '혜선'
}
})
  