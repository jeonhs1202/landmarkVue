var menu = {
    template: `<ul>
                    <div v-for="item in items">
                        <li>
                        <button class="item" v-bind:class="[btnid== item.id ? 'clicked' : '']" v-on:click="passData(item.id, $event)">
                            <div class="date">{{ item.createdTime }}</div>
                            <div class="name">{{ item.title }}</div>
                        </button>
                        </li>
                    </div>
                </ul>`
    ,
    props: ['items', 'btnid'],
    methods: {
        passData: function(id, event) {
            if(event)
                this.$emit('pass', id);
        }
    }
}

var trip = {
    template: `<div class="travel">
                    <li v-for="trip in triplist">
<<<<<<< Updated upstream
                        <div v-if="tripid===trip.id">
                            <img v-if="trip.firstImage2 == null" src="../img/temptrip.jpg" class="tripImg">
                            <button >{{ trip.title }}</button>
=======
                        <div v-if="tripid == trip.id">
                            <div class="title">{{ trip.title }}</div>
                            <div class="time" v-if="trip.modified === null">{{ trip.createdTime }}</div>
                            <div class="time" v-else>{{ trip.modifiedTime }}</div>
                            <hr class="line">
                            <img v-if="trip.firstImage == null" src="../img/temptrip.jpg" class="tripImg">
                            <div class="content">{{ trip.overview }}</div>
>>>>>>> Stashed changes
                        </div>
                    </li>
                </div>`
    ,
    props: ['triplist', 'tripid']
}

var myTrip = new Vue({
    el: '#_mytrip',
    data: {
        content: [
            {
                id: 1,
                userId: 0,
                addr1: "전라북도 순창군 적성면",
                addr2: null,
                areaCode: 37,
                sigunguCode: 7,
                cat1: "A02",
                cat2: "A0205",
                cat3: "A02050100",
                contentId: 2654773,
                contentTypeId: 12,
                tel: null,
                title: "순창군 채계산 출렁다리",
                overview: null,
                createdTime: "2020-04-28 16:14",
                modifiedTime: "2020-04-28 16:14",
                firstImage: null,
                firstImage2: null,
                homepage: null,
                readCount: 0
            },
            {
                id: 2,
                userId: 0,
                addr1: "충청남도 계룡시 두마면 입암길 218",
                addr2: null,
                areaCode: 34,
                sigunguCode: 16,
                cat1: "A01",
                cat2: "A0101",
                cat3: "A01011700",
                contentId: 2654766,
                contentTypeId: 12,
                tel: null,
                title: "계룡 입암저수지",
                overview: null,
                createdTime: "2020-04-28 16:05",
                modifiedTime: "2020-04-28 16:14",
                firstImage: null,
                firstImage2: null,
                homepage: null,
                readCount: 0
            }
        ],
        itemId: 0
    },
    created: function(){
        let uri = window.location.href.split('?');
        if (uri.length == 2) {
            let vars = uri[1].split('=');
            this.itemId = parseInt(vars[1]);
        }
<<<<<<< Updated upstream
=======
        axios.post('http://49.50.161.45:8080/review/search', {
            type: 0
        }, {
            headers: {
                'auth-token': window.localStorage.getItem('token')
            }
        }).then(res => {
            //console.log(res);
            this.content = (res.data);
        });
>>>>>>> Stashed changes
    },
    components: {
        'side-bar': menu,
        'my-trip': trip
    },
    methods: {
        showMyTrip: function(value){
            this.itemId = value;
        }
    }
})