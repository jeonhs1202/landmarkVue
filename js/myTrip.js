var menu = {
    template: `<ul>
                    <div v-for="item in items">
                        <li>
                        <button class="item" v-bind:id="item.id" v-bind:class="[btnid == item.id ? 'clicked' : '']" v-on:click="passData(item.id, $event); moveScroll(item.id); clickBtn();">
                            <div class="date">{{ item.createdTime }}</div>
                            <div class="name">{{ item.title }}</div>
                        </button>
                        </li>
                    </div>
                </ul>`
    ,
    props: ['items', 'btnid'],
    methods: {
        passData: function (id, event) {
            if (event)
                this.$emit('pass', id);
        },
        moveScroll: function (id) {
            var element = document.getElementById(id);
            element.scrollIntoView(true);
        },
        clickBtn: function() {
            this.$emit('click', true);
        }
    }
}

var trip = {
    template: `<div class="travel">
                    <li v-for="trip in triplist">
                        <div v-if="tripid == trip.id">
                            <div class="title">{{ trip.title }}</div>
                            <div class="time" v-if="trip.modified === null">{{ trip.createdTime }}</div>
                            <div class="time" v-else>{{ trip.modifiedTime }}</div>
                            <hr class="line">
                            <img v-if="trip.firstImage == null" src="../img/temptrip.jpg" class="tripImg">
                            <div class="content">{{ trip.overview }}</div>
                        </div>
                    </li>
                </div>`
    ,
    props: ['triplist', 'tripid']
}

var modifyReview = {
    template:
        `<transition name="modal">
        <div class="modal-mask">
            <div class = "modal-wrapper">
                <div class = "modal-container">
                    <div class = "model-header">
                        <h2>여행지 수정하기</h2>
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
}

var myTrip = new Vue({
    el: '#_mytrip',
    data: {
        content: [],
        itemId: 0,
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
        showModal: false,
        isClicked: false
    },
    created: function () {
        let uri = window.location.href.split('?');
        if (uri.length == 2) {
            let vars = uri[1].split('=');
            this.itemId = parseInt(vars[1]);
        }
        axios.post('http://49.50.161.45:8080/review/search', {
            type: 1
        }, {
            headers: {
                'auth-token': window.localStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res.data);
            this.content = (res.data);
        });
    },
    components: {
        'side-bar': menu,
        'my-trip': trip,
        'modify' : modifyReview
    },
    methods: {
        showMyTrip: function (value) {
            this.itemId = value;
        },
        modifyRv: function () {
            axios.put('http://49.50.161.45:8080/review', {
                id: this.itemId,
                private: true
            }, {
                headers: {
                    'auth-token': window.localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data) {
                    alert('등록되었습니다.');
                    window.location.href = "../view/main.html"
                } else {
                    alert('후기 등록에 실패하였습니다.');
                }
            });
        },
        clickMenu: function(value){
            this.isClicked = value;
        }
    }
})