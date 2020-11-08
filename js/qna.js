var qnabar = {
    props: {
        who: String,
        what: String,
    },
    template:
        `<div class="searchBar2">
        <div class="searchBarItem">
            <select v-model="who">
                <option disabled value="">검색 범위</option>
                <option>작성자</option>
                <option>제목</option>
            </select>
            <input type="text" v-model="what" placeholder="검색어를 입력하세요">
            <button v-on:click="passData(who, what)">검색</button>
        </div>
    </div>
    `,
    methods: {
        passData: function ( who, what) {
            if (event)
                this.$emit('who', who);
                this.$emit('what', what);
        }
    }
}

var addqna = {
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
                                <th>제목</th>
                                <td><input type="text" id="title" v-model="title"></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td>
                                    <textarea class="qna-textarea" id="content" v-model="content"></textarea>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class = "model-save-qna">
                        <button @click="passData(title, content);">작성</button>
                        <button @click="$emit('close')">닫기</button>
                    </div>    
                </div>
            </div>  
        </div>
    </transition>`,
    props: {
        title:String,
        content:String,
    },
    methods: {
        passData: function (title, content) {
            if(title.length == 0){
                alert('제목을 입력해주세요');
                return;
            }
            if(content.length == 0){
                alert('내용을 입력해주세요');
                return;
            }
            if (event) {
                this.$emit('title', title);
                this.$emit('content', content);
                this.$emit('pass');
            }
            this.$emit('close');
        }
    }
}

var qnalist = {
    template:
    `<div v-if="!isshown" class="notice">
        <table>
            <tr>
                <th>작성시각</th>
                <th>제목</th>
                <th>작성자</th>
            </tr>
            <tr v-for="(qna, i) in paginatedData" :key="i">
                <td v-if="qna.modifiedTime === null">{{ qna.creatiedTime }}</td>
                <td v-else>{{ qna.modifiedTime }}</td>
                <td><button type="button" class="qnaBtn" @click="returnID(qna.id)">{{ qna.title }}</button></td>
                <td>{{ qna.username }}</td>
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
            <div v-if="qnaid === l.id">
                <button type="button" @click="returnList">목록</button>
                <div class="title">{{ l.title }}</div>
                <div class="time" v-if="l.modifiedTime === null">{{ l.createdTime }}</div>
                <div class="time" v-else>{{ l.modifiedTime }}</div>
                <hr class="line">
                <div class="content">{{ l.content }}</div>
            </div>
        </li>
    </div>`,
    data() {
        return {
            pageNum: 0,
            isshown: false,
            qnaid: 0
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
        returnID: function (value) {
            this.qnaid = value;
            this.isshown = true;
        },
        returnList: function () {
            this.qnaid = 0;
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

var qna = new Vue({
    el: '#qna',
    data: {
        who: '',
        what: '',
        showModal: false,
        qnalist: [],
        title: '',
        content: ''
    },
    components: {
        'qna-bar': qnabar,
        'add-qna': addqna,
        'qna-list': qnalist
    },
    methods: {
        whoset: function (value) {
            this.who = value;
        },
        whatset: function (value) {
            this.what = value;
        },
        titleset: function(value) {
            this.title = value;
        },
        contentset: function(value) {
            this.content = value;
        },
        addQna: function() {

            axios.post('http://49.50.161.45:8080/qna', {
                title: this.title,
                content: this.content
            },{
                headers: {
                    'auth-token': window.localStorage.getItem('token')
                }
            }).then(res => {
                alert('문의사항이 등록되었습니다.');
                window.location.href='qna.html';
            }).catch(ex => {
                console.log(ex);
                alert('문의사항 등록에 실패하였습니다.');
            });
        }
    },
    created: function() {
        axios.get('http://49.50.161.45:8080/qna/search')
        .then(res => {
            this.qnalist = (res.data);
        }).catch (ex => {
            console.log(ex);
        });
    }
})