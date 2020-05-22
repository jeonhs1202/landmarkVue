var admin = {
    template: `<div>
                    <div class="btnArea">
                        <button class="btn1" v-on:click="clickReview" :class="[rv ? 'click' : 'non']">이용객들 후기 관리</button>
                        <button class="btn2" v-on:click="clickLandmark" :class="[lm ? 'click' : 'non']">관광지 관리</button>
                    </div>
                    <div class="adminContent">{{ content }}</div>
                </div>`,
    props: ['rv', 'lm', 'content'],
    methods: {
        clickReview: function () {
            this.$emit('click', 1);
        },
        clickLandmark: function () {
            this.$emit('click', 2);
        }
    }
}

var myTrip = new Vue({
    el: '#_mylandmark',
    components: {
        'my-landmark': admin
    },
    data: {
        review: false,
        landmark: false,
        RVcontent: '이용객 후기 목록',
        LMcontent: '관광지 목록',
        pass: ''
    },
    methods: {
        whichBtn: function (value) {
            if(value == 1){
                this.review = true;
                this.landmark = false;
                this.pass = this.RVcontent;
            }else if(value == 2){
                this.review = false;
                this.landmark = true;
                this.pass = this.LMcontent;
            }
        }
    }
})