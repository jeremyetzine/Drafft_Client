<template lang="html">
  <div class="container">
    <h1>the {{squads[currentUserID-1].name}}</h1>
    <div>
      <router-link to="/draft">back to the draft</router-link>
    </div>
    <table class="available">
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>PTS</th>
        <th>RB</th>
        <th>AST</th>
        <th>STL</th>
        <th>BLK</th>
        <th>FG%</th>
        <th>FT%</th>
        <th>3PM</th>
        <th>3P%</th>
        <th>Allstar Status</th>
      </tr>
      <tr v-for="player in squads[currentUserID-1].players">
        <td>{{player.name}}</td>
        <td>{{player.position}}</td>
        <td>{{player.pts}}</td>
        <td>{{player.rb}}</td>
        <td>{{player.ast}}</td>
        <td>{{player.stl}}</td>
        <td>{{player.blk}}</td>
        <td>{{player.fgperc}}%</td>
        <td>{{player.ftperc}}%</td>
        <td>{{player.threepm}}</td>
        <td>{{player.threeperc}}%</td>
        <td>{{player.allstar}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentUserID: [],
      users: [],
      squads: []
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/drafts/1.json')
        .then(response => {
          this.draft = response.data
          console.log('draft', this.draft)
        })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
    this.getUsers()
    this.getSquads()
  },
  methods: {
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          delete localStorage.email
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    },
    getUsers () {
      this.$http.secured.get('/users.json')
        .then(response => {
          this.users = response.data
          console.log('users', this.users)
          for (let user of this.users) {
            console.log('email ', user.email)
            if (localStorage.email === user.email) {
              const currentUserId = user.id
              console.log('currentUser = ' + currentUserId)
              this.currentUserID = currentUserId
            }
          }
        })
    },
    getSquads () {
      this.$http.secured.get('/squads.json')
        .then(response => {
          this.squads = response.data
          console.log('squads', this.squads)
        })
    }
  }
}
</script>

<style>
  .available {
    margin: auto;
  }
  th, td {
    padding: 10px;
  }
</style>
