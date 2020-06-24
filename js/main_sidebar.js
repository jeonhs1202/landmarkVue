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
        items: {}
    }
}

var sideBar = new Vue({
    el: '#_left',
    data:{
        history: []
    },
    created: function () {
        axios.get('http://49.50.161.45:8080/review/recent', {
            headers: {
                'auth-token': window.localStorage.getItem('token')
            }
        }).then(res => {
            this.history = (res.data);
            //console.log(res.data);
        });
    },
    components: {
        'side-bar': menu
    }
})