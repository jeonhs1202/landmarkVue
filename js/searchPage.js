Vue.component('searchBar',{
    props:{
        landMarkType: String,
        city: String,
        citylist: JSON,
        country: String,
        val: String
    },
    template: 
    `<div class="searchBar">
        <div class="searchBarItem">
            <select v-model="landMarkType">
                <option disabled value="">관광지 타입</option>
                <option>바다</option>
                <option>산</option>
                <option>숙소</option>
            </select>
            <select v-model="city">
                <option disabled value="">대분류</option>
                <option v-for:"cit in citylist">{{cit.name}}</option>
            </select>
            <select v-model="country">
                <option disabled value="">세부 분류</option>
                <option>강북구</option>
                <option>노원구</option>
                <option>강원도</option>
            </select>
            
            <input type="text" v-model="val" placeholder="검색어를 입력하세요">
            <button v-on:click="passData(landMarkType, city, country, val)">검색</button>
        </div>
    </div>`,
    methods:{
        passData: function(type, city, country, val) {
            if(event)
                this.$emit('type', type);
                this.$emit('city', city);
                this.$emit('country', country);
                this.$emit('val', val);
        }
    }
})



var searchPgage = new Vue({
    el: '#_searchPage',
    data: {
        name: '보현',
        city: '',
        citylist: JSON,
        country: '',
        landMarkType: '',
        val: ''
    },
    created:
        function() {
            axios.get('http://49.50.161.45:8080/code/area')
                .then(res => {
                    this.citylist = (res.data);
                    console.log(this.citylist);
                });
        }
    ,
    methods:{
        typeset: function(value){
            this.landMarkType = value;
        },
        cityset: function(value){
            this.city = value;
        },
        countryset: function(value){
            this.country = value;
        },
        valset: function(value){
            this.val = value;
        },
        citysend: function () {
            axios.get('http://49.50.161.45:8080/code/area')
                .then(res => {
                    this.cityList = res.data;
                    console.log(this.cityList);
                })
        }
    },
    })