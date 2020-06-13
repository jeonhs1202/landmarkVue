var menu = {
    template: `<ul>
                    <div v-for="item in items">
                        <li>
                        <button class="item" v-bind:class="[btnid == item.id ? 'clicked' : '']" v-on:click="passData(item.id, $event)">
                            <div class="date">{{ item.createdTime }}</div>
                            <div class="name">{{ item.addr1 }}</div>
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
                        <div v-if="tripid == trip.id">
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
        content: [],
        itemId: 0
    },
    created: function(){
        let uri = window.location.href.split('?');
        if (uri.length == 2) {
            let vars = uri[1].split('=');
            this.itemId = parseInt(vars[1]);
        }
        axios.get('http://49.50.161.45:8080/search', {
            params: {
                "page": 0,
                "size": 2,
                "type": 1,
                "keyword": "레저"
            }
        }).then(res => {
            this.content = (res.data);
        });
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