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
                                <td>
                                    <select v-model="city">
                                        <option disabled value="">지역</option>
                                        <option v-for="citi in citylist" v-bind:value="citi">{{ citi.name }}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>시군구</th>
                                <td>
                                    <select v-model="sigungu">
                                        <option disabled value="">시군구</option>
                                        <option v-for="sigun in sigungulist" v-if="city.code == sigun.areaCode" v-bind:value="sigun.code">{{ sigun.name }}</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>분류</th>
                                <td>
                                    <select v-model="type">
                                        <option disabled value="">분류</option>
                                        <option v-for="content in contentlist">{{ content.name }}</option>
                                    </select>
                                </td>
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
                                <td><input type="file" class="form-control" id="photo" v-on:change="handleChange"></td>
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
                        <button @click="passData(city.code, sigungu, type.contentTypeId, name, date, photo, review, etc); $emit('close');">저장</button>
                        <button @click="$emit('close')">닫기</button>
                    </div>    
                </div>
            </div>  
        </div>
    </transition>`,
    props: {
        city: '',
        citylist: {},
        sigungu: '',
        sigungulist: {},
        type: '',
        contentlist: {},
        name: '',
        date: '',
        photo: '',
        review: '',
        etc: ''
    },
    methods: {
        handleChange: function (event) {
            var file = event.target.files[0]
            if (file && file.type.match(/^image\/(png|jpeg|jpg)$/)) {
                this.photo = window.URL.createObjectURL(file)
            }
        },
        passData: function (city, sigungu, type, name, date, photo, review, etc) {
            if (event) {
                this.$emit('type', type);
                this.$emit('city', city);
                this.$emit('sigungu', sigungu);
                this.$emit('name', name);
                this.$emit('date', date);
                this.$emit('photo', photo);
                this.$emit('review', review);
                this.$emit('etc', etc);
                this.$emit('pass');
            }
        }
    }
})

var addMyButton = new Vue({
    el: '#_addmytrip',
    data: function () {
        return {
            city: '',
            citylist: [],
            sigungu: '',
            sigungulist: [],
            type: '',
            contentlist: [],
            name: '',
            date: '',
            photo: '',
            review: '',
            etc: '',
            showModal: false
        }
    },
    created: function () {
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
        axios.get(`${baseURI}/content-type`)
            .then(res => {
                this.contentlist = (res.data);
                // console.log(this.contentlist);
            });
    },
    methods: {
        typeset: function (value) {
            this.type = value;
        },
        cityset: function (value) {
            this.city = value;
        },
        sigunguset: function (value) {
            this.sigungu = value;
        },
        nameset: function (value) {
            this.name = value;
        },
        dateset: function (value) {
            this.date = value;
        },
        photoset: function (value) {
            this.photo = value;
        },
        reviewset: function (value) {
            this.review = value;
        },
        etcset: function (value) {
            this.etc = value;
        },
        addLandmark: function () {
            axios.post('http://49.50.161.45:8080/review', {
                areaCode: this.city,
                sigunguCode: this.sigungu,
                title: this.name,
                overview: this.review,
                tourId: this.type,
                firstImage: this.photo
            }, {
                headers: {
                    'auth-token': window.localStorage.getItem('token')
                }
            }).then(res => {
                if (res.data) {
                    alert('등록되었습니다.');
                    window.location.href="../view/main.html"
                } else {
                    alert('후기 등록에 실패하였습니다.');
                }
            });
        }
    }
})