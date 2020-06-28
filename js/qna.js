var qnabar = {
    props: {
        type: String,
        typelist: [],
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
    methods: {
        passData: function (type, who, what) {
            if (event)
                this.$emit('type', type);
            this.$emit('who', who);
            this.$emit('what', what);
        }
    }
}

var addqna = {
    props: {
        typelist: [],
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

var qnalist = {
    template:
    `<div>
        <table>
        <tr>
            <th>제목</th>
            <th>작성자</th>
        </tr>
        <tr v-for="(qna, i) in paginatedData" :key="i">
            <td>{{ qna.title }}</td>
            <td>{{ qna.userId }}</td>
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
    </div>`,
    data() {
        return {
            pageNum: 0
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

var qna = new Vue({
    el: '#qna',
    data: {
        type: '',
        typelist: ['여행지 등록', '내 여행 보기', '관광지 검색', '내 관광지 관리'],
        who: '',
        what: '',
        showModal: false,
        qnalist: []
    },
    components: {
        'qna-bar': qnabar,
        'add-qna': addqna,
        'qna-list': qnalist
    },
    methods: {
        typeset: function (value) {
            this.type = value;
        },
        whoset: function (value) {
            this.who = value;
        },
        whatset: function (value) {
            this.what = value;
        },
    },
    created: function() {
        axios.post('http://49.50.161.45:8080/qna/search')
        .then(res => {
            console.log(res);
            this.qnalist = (res.data);
        }).catch (ex => {
            console.log(ex);
        });
    }
})