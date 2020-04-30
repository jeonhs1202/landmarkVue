<template>
  <div class="container">
    <div class="left">
      <div class="logo-wrapper">
        <img class="logo" src="/static/images/logo.png">
      </div>
    </div>
    <div class="right">
      <div class="login-form">
        <form v-on:submit.prevent="submitForm">
          <div class="form-group">
            <label>ID</label>
            <input type="text" class="form-control">
          </div>
          <div class="form-group">
            <label>PW</label>
            <input type="password" class="form-control">
          </div>
          <button type="submit" class="btn btn-green">Log in</button>
          <a href="/register">Sign in</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import registrationService from '@/services/registration'

export default {
  name: 'LoginPage',
  data: function () {
    return {
      form: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    submitForm () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      authenticationService.authenticate(this.form).then(() => {
        this.$router.push({name: 'home'})
        this.$bus.$emit('authenticated')
        notify.closeAll()
      }).catch((error) => {
        this.errorMessage = error.message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 900px;
  height: 500px;
}

.left {
  height: 100%;
  background-color: #CADED1;
  overflow-x: hidden;
  padding-top: 50px;
  float: left;
  max-width: 450px;
}

.logo-wrapper {
  text-align: center;
  width: 450px;

  .logo {
    width: 250px;
    margin-top: 80px;
  }
}

.right {
  height: 100%;
  overflow-x: hidden;
  padding-top: 50px;
  float: left;
  max-width: 450px;
}

.login-form {
  text-align: center;
  margin-top: 100px;
  margin-left: 50px;
}

.form-group label {
  float: left;
  font-weight: bold;
  color: #000000;
}

.btn-green{
  background-color: #558967 !important;
  color: #ffffff;
}

a {
  padding: 10px;
  color: #000000;
}
</style>
