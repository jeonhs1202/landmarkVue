var menu = {
    template: `<ul>
                    <li>
                    <div class="logo">My History</div>
                    </li>
                    <div v-for="item in items" v-if="itemid != 0">
                        <li v-if="itemid === item.areaCode">
                            <a v-bind:href="'myTrip.html?id='+item.id"><button class="item">
                                <div class="location">
                                    <img src="../img/location.png" class="locImg">{{ item.title }} {{ item.overview }}
                                </div>
                            </button></a>
                        </li>
                    </div>
                    <div v-for="item in items" v-else>
                        <li>
                        <a v-bind:href="'myTrip.html?id='+item.id"><button class="item">
                            <div class="location">
                                <img src="../img/location.png" class="locImg">{{ item.areaName }} {{ item.sigunguName }}
                            </div>
                        </button></a>
                        </li>
                    </div>
                </ul>`
    ,
    props: {
        items: {},
        itemid: 0
    }
}

var sideBar = new Vue({
    el: '#_left',
    data:{
        history: [],
        areaCode: 0
    },
    created: function () {
        let uri = window.location.href.split('?');
        if (uri.length == 2) {
            let vars = uri[1].split('=');
            this.areaCode = parseInt(vars[1]);
        }
        const baseURI = 'http://49.50.161.45:8080/review'
        if(this.areaCode != 0){
            axios.post(`${baseURI}/search`, {
                type: 0
            },{
                headers: {
                    'auth-token': window.localStorage.getItem('token')
                }
            }).then(res => {
                this.history = (res.data);
                console.log(res.data);
            });
        }else{
            axios.get(`${baseURI}/recent`, {
                headers: {
                    'auth-token': window.localStorage.getItem('token')
                }
            }).then(res => {
                this.history = (res.data);
                //console.log(res.data);
            });
        }
    },
    components: {
        'side-bar': menu
    }
})