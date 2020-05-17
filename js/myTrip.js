var menu = {
    template: `<ul>
                    <div v-for="item in items">
                        <li>
                        <button class="item" v-on:click="passData(item.id, $event)">
                            <div class="date">{{ item.createdTime }}</div>
                            <div class="name">{{ item.addr1 }}</div>
                        </button>
                        </li>
                    </div>
                </ul>`
    ,
    props: ['items'],
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
                        <div v-if="tripid===trip.id">
                            <img v-if="trip.firstImage2 == null" src="../img/temptrip.jpg" class="tripImg">
                            <button >{{ trip.title }}</button>
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
        itemId: ""
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