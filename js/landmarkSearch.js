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

var landmarklist = {
    template:
    `<div v-if="!isshown">
        <table>
            <tr>
                <th>작성시각</th>
                <th>관광지 이름</th>
                <th>주소</th>
            </tr>
            <tr v-for="(lm, i) in paginatedData" :key="i">
                <td>{{ lm.modifiedTime }}</td>
                <td><button type="button" class="qnaBtn" @click="returnID(lm.id)">{{ lm.title }}</button></td>
                <td>{{ lm.addr1 }}</td>
            </tr>
        </table>
        <div class="btn-cover">
            <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
                이전
            </button>
            <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
            <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
                다음
            </button>
        </div>
    </div>
    <div v-else class="landmark">
        <li v-for="l in listArray">
            <div v-if="landmarkid === l.id">
                <div class="title">{{ l.title }}</div>
                <div class="time" v-if="l.modifiedTime === null">{{ l.createdTime }}</div>
                <div class="time" v-else>{{ l.modifiedTime }}</div>
                <hr class="line">
                <img v-if="l.firstImage1 == null" src="../img/temptrip.jpg" class="landmarkImg">
                <div class="content">{{ l.overview }}</div>
                <button type="button" @click="returnList">목록</button>
            </div>
        </li>
    </div>`,
    data() {
        return {
            pageNum: 0,
            isshown: false,
            landmarkid: 0
        }
    },
    props: {
        listArray: {
            type: Array,
            required: true
        },
        pageSize: {
            type: Number,
            required: false,
            default: 10
        }
    },
    methods: {
        nextPage() {
            this.pageNum += 1;
        },
        prevPage() {
            this.pageNum -= 1;
        },
        returnID: function(value) {
            this.landmarkid = value;
            this.isshown = true;
        },
        returnList: function() {
            this.landmarkid = 0;
            this.isshown = false;
        }
    },
    computed: {
        pageCount() {
            let listLeng = this.listArray.length,
                listSize = this.pageSize,
                page = Math.floor(listLeng / listSize);
            page = Math.floor((listLeng - 1) / listSize) + 1;

            return page;
        },
        paginatedData() {
            const start = this.pageNum * this.pageSize,
                end = start + this.pageSize;
            return this.listArray.slice(start, end);
        }
    }
}

var searchPgage = new Vue({
    el: '#_searchPage',
    data: {
        city: '',
        contentlist: [],
        citylist: [],
        sigungulist: [],
        sigungu: '',
        landMarkType: '',
        val: '',
        landmarklist: []
    },
    created: function() {
        const baseURI = 'http://49.50.161.45:8080'
        axios.get(`${baseURI}/code/content-type`)
            .then(res => {
                this.contentlist = (res.data);
                // console.log(this.contentlist);
            });
        axios.get(`${baseURI}/code/area`)
            .then(res => {
                this.citylist = (res.data);
                // console.log(this.citylist);
            });
        axios.get(`${baseURI}/code/sigungu`)
            .then(res => {
                this.sigungulist = (res.data);
                // console.log(this.sigungulist);
            });
        axios.post(`${baseURI}/search`, {
            contentTypeId: 12
        })
        .then(res => {
            this.landmarklist = (res.data);
        });
    },
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
        'search-bar': searchBar,
        'landmark-list': landmarklist
    }
})