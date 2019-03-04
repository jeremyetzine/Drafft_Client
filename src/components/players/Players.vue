<template>
  <div class="players">
    <h3> Players </h3>
    <div class="sign-out float-right">
      <label @click="signOut">Sign out</label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
