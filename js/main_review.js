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
                                <td><input type="text" class="form-control" id="city" v-model="city"></td>
                            </tr>
                            <tr>
                                <th>관광지명</th>
                                <td><input type="text" class="form-control" id="name" v-model="name"></td>
                            </tr>
                            <tr>
                                <th>일시</th>
                                <td><input type="date" class="form-control" id="date" v-model="date"></td>
                            </tr>
                            <tr>
                                <th>사진</th>
                                <td><input type="text" class="form-control" id="photo" v-model="photo"></td>
                            </tr>
                            <tr>
                                <th>후기</th>
                                <td><input type="text" class="form-control" id="review" v-model="review"></td>
                            </tr>
                            <tr>
                                <th>기타</th>
                                <td><input type="text" class="form-control" id="etc" v-model="etc"></td>
                            </tr>
                        </table>
                    </div>

                    <div class = "model-save">
                        <button @click="$emit('close')">저장</button>
                    </div>    
                </div>
            </div>  
        </div>
    </transition>`,
    props: {
        city: '',
        citylist: [],
        sigungu: '',
        sigungulist: [],
        name: '',
        date: '',
        photo: '',
        review: '',
        etc: ''
    }
})

var addMyButton = new Vue({
    el: '#_addmytrip',
    data: function() {
        return {
            city: '',
            citylist: [],
            sigungu: '',
            sigungulist: [],
            name: '',
            date: '',
            photo: '',
            review: '',
            etc: '',
            showModal: false
        }
    },
    created: function() {
        const baseURI = 'http://49.50.161.45:8080/code'
        axios.get(`${baseURI}/area`)
            .then(res => {
                this.citylist = (res.data);
                // console.log(this.citylist);
            });
        axios.get(`${baseURI}/sigungu`)
            .then(res => {
                this.sigungulist = (res.data);
                // console.log(this.sigungulist);
            });
        },
        methods: {
            cityset: function(value){
                this.city = value;
            },
            sigunguset: function(value){
                this.sigungu = value;
            },
        }
})