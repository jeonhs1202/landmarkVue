var admin = {
    template: `<div>
                    <div class="btnArea">
                        <button class="btn" v-on:click="clickReview" :class="{click : review}">이용객들 후기 관리</button>
                        <button class="btn" v-on:click="clickLandmark" :class="{click : landmark}">관광지 관리</button>
                    </div>
                    <div class="adminContent"></div>
                </div>`,
    props: {
        review: false,
        landmark: false
    },
    methods: {
        clickReview: function () {
            this.review = true;
            this.landmark = false;
        },
        clickLandmark: function () {
            this.review = false;
            this.landmark = true;
        }
    }
}

var myTrip = new Vue({
    el: '#_mylandmark',
    components: {
        'my-landmark': admin
    }
})