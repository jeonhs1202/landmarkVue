var menu = {
    template: `<ul>
                    <li>
                    <div class="logo">My History</div>
                    </li>
                    <div v-for="item in items">
                        <li>
                        <a v-bind:href="'myTrip.html?id='+item.id"><button class="item">{{ item.addr1 }}
                        <img v-if="item.firstImage2 == null" src="../img/temptrip.jpg" class="itemImg">
                        </button></a>
                        </li>
                    </div>
                </ul>`
    ,
    props: {
        items: {
            id: null,
            userId: null,
            addr1: null,
            addr2: null,
            areaCode: null,
            sigunguCode: null,
            cat1: null,
            cat2: null,
            cat3: null,
            contentId: null,
            contentTypeId: null,
            tel: null,
            title: null,
            overview: null,
            createdTime: null,
            modifiedTime: null,
            firstImage: null,
            firstImage2: null,
            homepage: null,
            readCount: null
        }
    }
}

var sideBar = new Vue({
    el: '#_left',
    data:{
        history: [
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
        ]
    },
    components: {
        'side-bar': menu
    }
})