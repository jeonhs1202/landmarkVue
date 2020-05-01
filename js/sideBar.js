var menu = {
    template: `<ul>
                    <li>
                    <div class="logo">My History</div>
                    </li>
                    <div v-for="item in items">
                        <li>
                        <button class="item">{{ item }}</button>
                        </li>
                    </div>
                    </li>
                </ul>`
    ,
    props: ['items']
}

var sideBar = new Vue({
    el: '#_left',
    data:{
          history: ["서울", "가평", "춘천"]      
    },
    components: {
        'side-bar': menu
    }
})