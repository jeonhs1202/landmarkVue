Vue.component('searchBar',{
    props:{
        landMarkType: String,
        city: String,
        country: String,
        val: String,
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
                <option>서울특별시</option>
                <option>경기도</option>
                <option>강원도</option>
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
        country: '',
        landMarkType: '',
        val: '',
    },
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
        }
    }
    })