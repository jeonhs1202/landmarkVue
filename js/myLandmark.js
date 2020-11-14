var admin = {
  template: `
    <div>
      <div class="btnArea">
          <button class="btn1" v-on:click="clickReview" :class="[rv ? 'click' : 'non']">이용객들 후기 관리</button>
          <button class="btn2" v-on:click="clickLandmark" :class="[lm ? 'click' : 'non']">관광지 관리</button>
      </div>
      <div class="adminContent">
          <div>
            <div class="tb">
              <table>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <thead>
                  <tr>
                    <th> 후기 번호 </th>
                    <th> 제목 </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="content in contents">
                    <td>
                        {{content.id}}
                    </td>
                    <td>
                        <button class="detailBtn" @click="showDetail(content.id, content.areaCode, content.sigunguCode)">{{content.title}}</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="detail">
              <h4>후기 상세 정보</h4>
                <div v-for="content in contents" v-if="id === content.id">
                  <table>
                    <tr><th>항목</th><th></th></tr>
                    <tr>
                      <td>위치</td><td>{{ city }} {{ sigungu }}</td>
                    </tr>
                    <tr>
                      <td>작성 시각</td><td>{{ content.createdTime }}</td></tr>
                    <tr><td>수정 시각</td><td>{{ content.modifiedTime }}</td></tr>
                    <tr><td>제목</td><td>{{ content.title }}</td></tr>
                    <tr><td>내용</td><td>{{ content.overview }}</td></tr>
                  </table>
                  <button @click="deleteRV" class="delBtn">삭제</button>
                </div>
            </div>
          </div>
      </div>
    </div>`,
  props: ['rv', 'lm', 'contents', 'id', 'city', 'sigungu'],
  methods: {
    clickReview: function () {
      this.$emit('click', 1);
    },
    clickLandmark: function () {
      this.$emit('click', 2);
    },
    showDetail: function (id, areaCode, sigunguCode) {
      this.$emit('id', id);
      this.$emit('cname', areaCode);
      this.$emit('sname', sigunguCode);
    },
    deleteRV: function () {
      this.$emit('del');
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
    citylist: [],
    sigungulist: [],
    city: '',
    sigungu: '',
    areacode: 0,
    pass: {},
    id: 0,
  },
  created: function () {
    const baseURI = 'http://49.50.161.45:8080';
    axios.get(`${baseURI}/code/area`).then((res) => {
      this.citylist = res.data;
    });
    axios.get(`${baseURI}/code/sigungu`).then((res) => {
      this.sigungulist = res.data;
    });
    axios
      .post(
        `${baseURI}/review/search`,
        { type: 0 },
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
    idset: function (value) {
      this.id = value;
    },
    cname: function (value) {
      let len = this.citylist.length;
      for (let i = 0; i < len; i++) {
        if (this.citylist[i].code == value) {
          this.city = this.citylist[i].name;
          this.areacode = value;
          break;
        }
      }
    },
    sname: function (value) {
      let len = this.sigungulist.length;
      for (let i = 0; i < len; i++) {
        if (
          this.sigungulist[i].areaCode == this.areacode &&
          this.sigungulist[i].code == value
        ) {
          this.sigungu = this.sigungulist[i].name;
          break;
        }
      }
    },
    deleteRV: function () {
      axios
        .delete(`http://49.50.161.45:8080/review`, {
          id: this.id,
        })
        .then((res) => {
          if (res.data) alert('삭제되었습니다.');
        })
        .catch((res) => {
          alert('삭제 처리에 실패하였습니다.');
        });
    },
  },
});
