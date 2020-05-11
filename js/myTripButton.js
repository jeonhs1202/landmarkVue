var city = {
    template: `<div class="btn">
                    <li v-for="(city, i) in citylist" v-bind:class="{'odd':i%2==1, 'even':i%2==0}">
                        <button v-bind:class="city.level">{{ city.name }}</button>
                    </li>
                </div>`
    ,
    props: {
        citylist: {
            name: '',
            level: ''
        }
    }
}

var myButton = new Vue({
    el: '#_mybutton',
    data: {
          citybutton: [
            {name: '서울', level: 'one'}, 
            {name: '인천', level: 'two'},
            {name: '대전', level: 'three'}, 
            {name: '대구', level: 'four'}, 
            {name: '광주', level: 'five'}, 
            {name: '부산', level: 'six'}, 
            {name: '울산', level: 'seven'}, 
            {name: '세종특별자치시', level: 'eight'},
            {name: '경기도', level: 'nine'}, 
            {name: '강원도', level: 'ten'}, 
            {name: '충청북도', level: 'nine'}, 
            {name: '충청남도', level: 'eight'}, 
            {name: '경상북도', level: 'seven'}, 
            {name: '경상남도', level: 'six'}, 
            {name: '전라북도', level: 'five'}, 
            {name: '전라남도', level: 'four'}, 
            {name: '제주도', level: 'three'}
        ]      
    },
    components: {
        'my-button': city
    }
})