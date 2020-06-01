Vue.component('modal', {
    template: 
    `<transition name="modal">
        <div class="modal-mask">
            <div class = "modal-wrapper">
                <div class = "modal-container">
                    <div class = "model-header">
                        <h2>여행지 추가하기</h2>
                    </div>
                    <div>
                        <table class = "modal-table">
                            <tr>
                                <th>지역</th>
                                <td>서울시 노원구</td>
                            </tr>
                            <tr>
                                <th>관광지명</th>
                                <td>우리집</td>
                            </tr>
                            <tr>
                                <th>일시</th>
                                <td>1996.12.02</td>
                            </tr>
                            <tr>
                                <th>사진</th>
                                <td>pic</td>
                            </tr>
                            <tr>
                                <th>후기</th>
                                <td>내 집 같은 편안함</td>
                            </tr>
                            <tr>
                                <th>기타</th>
                                <td>guitar</td>
                            </tr>
                        </table>
                    </div>

                    <div class = "model-save">
                        <button @click="$emit('close')">저장</button>
                    </div>    
                </div>
            </div>  
        </div>
    </transition>`
})

var addMyButton = new Vue({
    el: '#_addmytrip',
    data: {
        city: '',
        citylist: [],
        sigungu: '',
        sigungulist: [],
        showModal: false
    },
    created: function() {
        const baseURI = 'http://49.50.161.45:8080/code'
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
        },
        methods: {
            cityset: function(value){
                this.city = value;
            },
            countryset: function(value){
                this.sigungu = value;
            },
        }
})