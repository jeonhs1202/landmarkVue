var admin = {
  template: `<div>
                    <div class="btnArea">
                        <button class="btn1" v-on:click="clickReview" :class="[rv ? 'click' : 'non']">이용객들 후기 관리</button>
                        <button class="btn2" v-on:click="clickLandmark" :class="[lm ? 'click' : 'non']">관광지 관리</button>
                    </div>
                    <div class="adminContent">
                        <template v-if="detail">
                            <div v-for="content in contents" v-if="id === content.id"></div>
                        </template>
                        <template v-else>
                            <table class="tb">
                                <div v-for="content in contents">
                                    <tr>
                                        <td>
                                            {{content.id}}
                                        </td>
                                        <td>
                                            {{content.title}}
                                        </td>
                                    </tr>
                                </div>
                            </table>
                        </template>
                    </div>
                </div>`,
  props: ['rv', 'lm', 'contents', 'detail', 'id'],
  methods: {
    clickReview: function () {
      this.$emit('click', 1);
    },
    clickLandmark: function () {
      this.$emit('click', 2);
    },
    showDetail: function (id) {
      this.$emit('detail', true);
      this.$emit('id', id);
    },
  },
};

var myTrip = new Vue({
  el: '#_mylandmark',
  components: {
    'my-landmark': admin,
  },
  data: {
    review: true,
    landmark: false,
    RVcontentlist: {},
    LMcontentlist: {},
    pass: {},
    detail: false,
    id: 0,
  },
  created: function () {
    const baseURI = 'http://49.50.161.45:8080';
    axios
      .post(
        `${baseURI}/review/search`,
        {
          type: 0,
        },
        {
          headers: {
            'auth-token': window.localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        this.RVcontentlist = res.data;
        this.pass = this.RVcontentlist;
      })
      .catch((ex) => {
        console.log(ex);
      });
  },
  methods: {
    whichBtn: function (value) {
      if (value == 1) {
        this.review = true;
        this.landmark = false;
        this.pass = this.RVcontentlist;
      } else if (value == 2) {
        this.review = false;
        this.landmark = true;
        this.pass = this.LMcontentlist;
      }
    },
  },
});
