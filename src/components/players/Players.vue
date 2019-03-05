<template>
  <div class="containter">
    <div class="sign-out">
      <label @click="signOut">Sign out</label>
    </div>
    <div class="players">
      <h3> Players </h3>
      <table>
        <td v-for="player in players">
          {{player.name}}
        </td>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      players: [
        {name: 'Trae Young'},
        {name: 'Kevin Huerter'}
      ]
    }
  },
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

 <style>
  .sign-out {
    text-align: right;
    padding: 1%;
  }
 </style>
