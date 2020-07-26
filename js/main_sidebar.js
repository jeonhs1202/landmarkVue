var menu = {
    template: `<ul>
                    <li>
                    <div class="logo">My History</div>
                    </li>
                    <div v-for="item in items">
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
            axios.get(`${baseURI}/names/${this.areaCode}`, {
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
                console.log(this.history);
            });
        }
    },
    components: {
        'side-bar': menu
    }
})