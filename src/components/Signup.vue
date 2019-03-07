<template>
  <div class="container">
    <h1>Drafft</h1>
    <i class="fas fa-basketball-ball"></i>
    <form class="form-signup" @submit.prevent="signup">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input v-model="email" type="email" class="form-control" id="email" placeholder="email@example.com">
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="username" class="form-control" id="username" placeholder="chicken">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <div class="form-group">
        <label for="password">Password Confirmation</label>
        <input v-model="password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Password Confirmation">
      </div>
      <button type="submit" class="btn btn-primary mb-3">Sign up</button>
      <div>
        <router-link to="/signin">Sign in</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      username: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation, username: this.username })
        .then(response => this.signupSuccessful(response, this.email))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response, email) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      localStorage.email = email
      this.error = ''
      this.$router.replace('/draft')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/draft')
      }
    }
  }
}
</script>

<style lang="css">
  .form-signup {
    width: 70%;
    max-width: 500px;
    padding: 5% 15px;
    margin: 0 auto;
  }
  .fas {
    color: orange;
    font-size: 1000%;
    -webkit-animation: rotation 10s infinite linear;
  }
  @-webkit-keyframes rotation {from {-webkit-transform: rotate(0deg)} to {-webkit-transform: rotate(359deg)}}
</style>
