<template>
  <div class="container">
    <h1>Drafft</h1>
    <i class="fas fa-basketball-ball"></i>
    <form class="form-signin" @submit.prevent="signin">
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
      <button type="submit" class="btn btn-primary mb-3">Sign in</button>
      <div>
        <router-link to="/">Sign up</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
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
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password, username: this.username })
        .then(response => this.signinSuccessful(response, this.email))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response, email) {
      console.log('response is: ', response.data)
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      localStorage.email = email
      this.error = ''
      this.$router.replace('/draft')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'that account doesnt exist, signup to create an account'
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
  .form-signin {
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
