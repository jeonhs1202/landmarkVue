var qnabar = {
    props:{
        type: String,
        typelist:[],
        who: String,
        what: String,
    },
    template: 
    `<div class="searchBar2">
        <div class="searchBarItem">
            <select v-model="type">
                <option disabled value="">분류</option>
                <option v-for="type in typelist">{{ type }}</option>
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
}

var addqna = {
    props:{
        typelist:[],
    },
    template: 
    `<transition name="modal">
        <div class="modal-mask-qna">
            <div class = "modal-wrapper-qna">
                <div class = "modal-container-qna">
                    <div class = "model-header-qna">
                        <h2>문의 사항 작성</h2>
                    </div>
                    <div>
                        <table class = "modal-table-qna">
                            <tr>
                                <th>분류</th>
                                <td>
                                    <select v-model="type" style="height: 28px;">
                                        <option disabled value="">분류</option>
                                        <option v-for="type in typelist">{{ type }}</option>
                                    </select>   
                                </td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>우리집</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <textarea class="qna-textarea"></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class = "model-save-qna">
                        <button @click="$emit('close')">작성</button>
                    </div>    
                </div>
            </div>  
        </div>
    </transition>`
}


var qna = new Vue({
    el: '#qna',
    data: {
        type: '',
        typelist:['여행지 등록', '내 여행 보기', '관광지 검색', '내 관광지 관리'],
        who: '',
        what: '',
        showModal: false
    },
    components: {
        'qna-bar': qnabar,
        'add-qna': addqna,
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