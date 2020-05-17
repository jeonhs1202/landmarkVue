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
            {name: '서울', level: 'a'}, 
            {name: '인천', level: 'b'},
            {name: '대전', level: 'c'}, 
            {name: '대구', level: 'd'}, 
            {name: '광주', level: 'e'}, 
            {name: '부산', level: 'f'}, 
            {name: '울산', level: 'g'}, 
            {name: '세종특별자치시', level: 'h'},
            {name: '경기도', level: 'i'}, 
            {name: '강원도', level: 'j'}, 
            {name: '충청북도', level: 'i'}, 
            {name: '충청남도', level: 'h'}, 
            {name: '경상북도', level: 'g'}, 
            {name: '경상남도', level: 'f'}, 
            {name: '전라북도', level: 'e'}, 
            {name: '전라남도', level: 'd'}, 
            {name: '제주도', level: 'c'}
        ]      
    },
    computed: {
        citybuttonsort : function() {
            function compare(a, b) {
              return (a.level > b.level) ? -1 : 1;
            }        
            return this.citybutton.sort(compare);
          }
    },
    components: {
        'my-button': city
    },
    
})