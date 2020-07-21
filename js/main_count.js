var city = {
    template: `<div class="btn">
                    <li v-for="(city, i) in citylist">
                        <a v-bind:href="'main.html?areaCode='+ city.area">    
                            <button v-bind:class="city.level">
                                {{ city.name }}
                            </button>
                        </a>
                    </li>
                </div>`
    ,
    props: {
        citylist: {}
    }
}

var myButton = new Vue({
    el: '#_mybutton',
    data: {
        posts:[],
        citybutton: []      
    },
    created: function() {
        const baseURI = 'http://49.50.161.45:8080/review/count'
        axios.get(`${baseURI}`,{
            headers: {
                'auth-token': window.localStorage.getItem('token')
            }
        })
        .then(res => { 
            this.posts = res.data;
            //console.log(res.data);
            for(var i in this.posts){
                this.count2level(this.posts[i].name,this.posts[i].level,this.posts[i].areaCode);
            }
        });
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
    methods:{
        count2level:function (cityname, count, areaCode) {
            switch (count) {
                case 0:
                    this.citybutton.push({name: cityname, level: 'a', area: areaCode});
                    break;
                case 1:
                    this.citybutton.push({ name: cityname, level: 'b', area: areaCode});
                    break;
                case 2:
                    this.citybutton.push({ name: cityname, level: 'c', area: areaCode});
                    break;
                case 3:
                    this.citybutton.push({ name: cityname, level: 'd', area: areaCode});
                    break;
                case 4:
                    this.citybutton.push({ name: cityname, level: 'e', area: areaCode});
                    break;
                case 5:
                    this.citybutton.push({ name: cityname, level: 'f', area: areaCode});
                    break;
                case 6:
                    this.citybutton.push({ name: cityname, level: 'g', area: areaCode});
                    break;
                case 7:
                    this.citybutton.push({ name: cityname, level: 'h', area: areaCode});
                    break;
                case 8:
                    this.citybutton.push({ name: cityname, level: 'i', area: areaCode});
                    break;
                default:
                    this.citybutton.push({ name: cityname, level: 'j', area: areaCode});
                    break;
            }
        }
    }
})