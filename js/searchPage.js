var searchBar = {
    props:{
        landMarkType: String,
        city: String,
        contentlist: { contentTypeId: '', name: '' },
        citylist: { code: '', name: '' },
        sigungulist: { areaCode: '', code: '', name: '' },
        sigungu: String,
        val: String
    },
    template: 
    `<div class="searchBar">
        <div class="searchBarItem">
            <select v-model="landMarkType">
                <option disabled value="">분류</option>
                <option v-for="content in contentlist">{{ content.name }}</option>
            </select>
            <select v-model="city">
                <option disabled value="">지역</option>
                <option v-for="cit in citylist" v-bind:value="cit">{{ cit.name }}</option>
            </select>
            <select v-model="sigungu">
                <option disabled value="">시군구</option>
                <option v-for="sigungu in sigungulist" v-if="city.code == sigungu.areaCode">{{ sigungu.name }}</option>
            </select>
            
            <input type="text" v-model="val" placeholder="검색어를 입력하세요">
            <button v-on:click="passData(landMarkType, city, sigungu, val)">검색</button>
        </div>
    </div>`,
    methods:{
        passData: function(type, city, sigungu, val) {
            if(event)
                this.$emit('type', type);
                this.$emit('city', city);
                this.$emit('sigungu', sigungu);
                this.$emit('val', val);
        }
    }
}



var searchPgage = new Vue({
    el: '#_searchPage',
    data: {
        name: '보현',
        city: '',
        contentlist: [],
        citylist: [],
        sigungulist: [],
        sigungu: '',
        landMarkType: '',
        val: ''
    },
    created: function() {
        const baseURI = 'http://49.50.161.45:8080/code'
        axios.get(`${baseURI}/content-type`)
            .then(res => {
                this.contentlist = (res.data);
                console.log(this.contentlist);
            });
        axios.get(`${baseURI}/area`)
            .then(res => {
                this.citylist = (res.data);
                console.log(this.citylist);
            });
        axios.get(`${baseURI}/sigungu`)
            .then(res => {
                this.sigungulist = (res.data);
                console.log(this.sigungulist);
            });
        }
    ,
    methods: {
        typeset: function(value){
            this.landMarkType = value;
        },
        cityset: function(value){
            this.city = value;
        },
        countryset: function(value){
            this.sigungu = value;
        },
        valset: function(value){
            this.val = value;
        }
    },
    components: {
        'search-bar': searchBar
    }
})