<template>
  <div class="container">
    <div class="logo-wrapper">
      <img class="logo" src="/static/images/logo2.png">
    </div>
    <div class="register-form">
      <form @submit.prevent="submitForm">
        <div class="default">
          <div class="form-group">
            <label>ID</label>
            <input type="text" class="form-control" id="username" v-model="form.username">
            <div class="field-error" v-if="$v.form.username.$dirty">
              <div class="error" v-if="!$v.form.username.required">ID를 입력해주세요.</div>
              <div class="error" v-if="!$v.form.username.alphaNum">ID는 문자나 숫자만 입력가능합니다.</div>
              <div class="error" v-if="!$v.form.username.minLength">ID는 적어도 {{$v.form.username.$params.minLength.min}}자 이상이어야 합니다.</div>
              <div class="error" v-if="!$v.form.username.maxLength">ID는 {{$v.form.username.$params.maxLength.max}}자를 초과할 수 없습니다.</div>
            </div>
          </div>
          <div class="form-group">
            <label>PW</label>
            <input type="password" class="form-control" id="password" v-model="form.password">
            <div class="field-error" v-if="$v.form.password.$dirty">
              <div class="error" v-if="!$v.form.password.required">비밀번호를 입력해주세요.</div>
              <div class="error" v-if="!$v.form.password.minLength">비밀번호는 적어도 {{$v.form.password.$params.minLength.min}}자 이상이어야 합니다.</div>
              <div class="error" v-if="!$v.form.password.maxLength">비밀번호는 {{$v.form.password.$params.maxLength.max}}자를 초과할 수 없습니다.</div>
            </div>
          </div>
          <div class="form-group">
            <label>PW 확인</label>
            <input type="password" class="form-control" id="password-confirm" v-model="form.passwordconfirm">
            <div class="field-error" v-if="$v.form.passwordconfirm.$dirty">
              <div class="error" v-if="!$v.form.passwordconfirm.required">비밀번호를 입력해주세요.</div>
              <div class="error" v-if="!$v.form.passwordconfirm.minLength">비밀번호는 적어도 {{$v.form.password.$params.minLength.min}}자 이상이어야 합니다.</div>
              <div class="error" v-if="!$v.form.passwordconfirm.maxLength">비밀번호는 {{$v.form.password.$params.maxLength.max}}자를 초과할 수 없습니다.</div>
            </div>
          </div>
          <div class="form-group">
            <label>메일</label>
            <input type="email" class="form-control" id="emailAddress" v-model="form.emailAddress">
            <div class="field-error" v-if="$v.form.emailAddress.$dirty">
              <div class="error" v-if="!$v.form.emailAddress.required">이메일을 입력해주세요.</div>
              <div class="error" v-if="!$v.form.emailAddress.email">유효한 이메일 주소가 아닙니다.</div>
              <div class="error" v-if="!$v.form.emailAddress.maxLength">이메일 주소는 {{$v.form.emailAddress.$params.maxLength.max}}자를 초과할 수 없습니다.</div>
            </div>
          </div>
        </div>
        <label class="check-level2">저는 관광지를 운영합니다.</label>
        <input type="checkbox" class="level2">
          <div class="level2-form">
            <div class="level2-left">
              <div class="form-group">
                <label>지역</label>
                <select id="input-region" class="form-control">
                  <option selected>... 지역을 선택하세요 ...</option>
                  <option>서울</option>
                  <option>인천</option>
                  <option>대전</option>
                  <option>대구</option>
                  <option>광주</option>
                  <option>부산</option>
                  <option>울산</option>
                  <option>세종특별자치시</option>
                  <option>경기도</option>
                  <option>강원도</option>
                </select>
              </div>
              <div class="form-group">
                <label>분류</label>
                <input type="text" class="form-control">
              </div>
              <div class="form-group">
                <label>관광지명</label>
                <input type="text" class="form-control">
              </div>
            </div>
            <div class="level2-right">
              <div class="form-group">
                <label>URL(옵션)</label>
                <input type="text" class="form-control">
              </div>
              <div class="form-group">
                <textarea class="notice" readonly="readonly" onfocus="this.blur()">운영자일 경우, 내부 심사 진행 후
                  관광지 등록이 진행됩니다.</textarea>
              </div>
            </div>
          </div>
        <button type="submit" class="btn btn-green">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script>
import registrationService from '@/services/registration'
import { required, email, minLength, maxLength, alphaNum } from 'vuelidate/lib/validators'

export default {
  name: 'RegisterPage',
  data: function () {
    return {
      form: {
        username: '',
        emailAddress: '',
        password: '',
        passwordconfirm: ''
      },
      errorMessage: ''
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(50),
        alphaNum
      },
      emailAddress: {
        required,
        email,
        maxLength: maxLength(100)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
      },
      passwordconfirm: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    submitForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      registrationService.register(this.form).then(() => {
        this.$router.push({ name: 'LoginPage' })
      }).catch((error) => {
        this.errorMessage = 'Failed to register user. ' + error.message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 900px;
  height: 700px;
  background-color: #CADED1;
}

.logo-wrapper {
  text-align: center;
  width: 900px;

  .logo {
    width: 250px;
  }
}

.register-form {
  height: 100%;
  float: left;
  max-width: 900px;
}

.default {
  height: 100%;
  overflow-x: hidden;
  float: center;
  margin-left: 280px;
  width: 350px;
}

.form-group label {
  float: left;
  font-weight: bold;
  color: #000000;
}

.check-level2 {
  margin-left: 350px;
}

.level2 {
  margin-left: 10px;
}

input[type=checkbox]:checked + .level2-form {
  width: 900px;
  height: 250px;

  -ms-transition-duration: 1s;
  -webkit-transition-duration: 1s;
  -moz-transition-duration: 1s;
  -o-transition-duration: 1s;
  transition-duration: 1s;
}

.level2-form {
  overflow: hidden;
  height: 0px;
  margin-left: 50px;
}

.level2-left {
  float: left;
}

.level2-right {
  float: right;
  max-width: 300px;
  margin-right: 300px;
}

.notice {
 float: left;
 width: 250px;
 height: 60px;
 margin-top: 30px;
 resize: none;
 text-align: center;
}

.btn-green{
  background-color: #558967 !important;
  color: #ffffff;
  margin-left: 400px;
}
</style>
