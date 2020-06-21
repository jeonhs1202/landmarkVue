var city = {
    template: `<div class="btn">
                    <li v-for="(city, i) in citylist">
                        <button v-bind:class="city.level">{{ city.name }}</button>
                    </li>
                </div>`
    ,
    props: {
        citylist: {
            name: '',
            level: ''
        },
    },
    methods: {
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
            for(var i in this.posts){
                this.count2level(this.posts[i].name,this.posts[i].count);
            }
            // console.log(this.posts[0].count);
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
        count2level:function (cityname, count) {
            switch (count) {
                case 0:
                    this.citybutton.push({name: cityname, level: 'a'});
                    break;
                case 1:
                    this.citybutton.push({name: cityname, level: 'b'});
                    break;
                case 2:
                    this.citybutton.push({name: cityname, level: 'c'});
                    break;
                case 3:
                    this.citybutton.push({name: cityname, level: 'd'});
                    break;
                case 4:
                    this.citybutton.push({name: cityname, level: 'e'});
                    break;
                case 5:
                    this.citybutton.push({name: cityname, level: 'f'});
                    break;
                case 6:
                    this.citybutton.push({name: cityname, level: 'g'});
                    break;
                case 7:
                    this.citybutton.push({name: cityname, level: 'h'});
                    break;
                case 8:
                    this.citybutton.push({name: cityname, level: 'i'});
                    break;
                default:
                    this.citybutton.push({name: cityname, level: 'j'});
                    break;
            }
        }
    }
})