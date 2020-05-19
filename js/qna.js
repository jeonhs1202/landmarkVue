Vue.component('qnabar',{
    props:{
        type: String,
        who: String,
        what: String,
    },
    template: 
    `<div class="searchBar2">
        <div class="searchBarItem">
            <select v-model="type">
                <option disabled value="">분류</option>
                <option>여행지 등록</option>
                <option>내 여행 보기</option>
                <option>관광지 검색</option>
                <option>내 관광지 관리</option>
            </select>
            <select v-model="who">
                <option disabled value="">검색 범위</option>
                <option>작성자</option>
                <option>제목</option>
            </select>
            <input type="text" v-model="what" placeholder="검색어를 입력하세요">
            <button v-on:click="passData(type, who, what)">검색</button>
        </div>
    </div>
    `,
    methods:{
        passData: function(type, who, what) {
            if(event)
                this.$emit('type', type);
                this.$emit('who', who);
                this.$emit('what', what);
        }
    }
})



var qna = new Vue({
    el: '#qna',
    data: {
        type: '',
        who: '',
        what: '',
    },
    methods:{
        typeset: function(value){
            this.type = value;
        },
        whoset: function(value){
            this.who = value;
        },
        whatset: function(value){
            this.what = value;
        },
    },
})