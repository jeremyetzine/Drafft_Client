<template lang="html">
  <div class="container">
    <div class="background">
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
      <marquee scrollamount="10">
        <i class="fas fa-basketball-ball ball10"></i>
      </marquee>
      <marquee scrollamount="3">
        <i class="fas fa-basketball-ball ball3"></i>
      </marquee>
      <marquee scrollamount="8">
        <i class="fas fa-basketball-ball ball8"></i>
      </marquee>
      <marquee scrollamount="6">
        <i class="fas fa-basketball-ball ball6"></i>
      </marquee>
      <marquee scrollamount="1">
        <i class="fas fa-basketball-ball ball1"></i>
      </marquee>
      <marquee scrollamount="7">
        <i class="fas fa-basketball-ball ball7"></i>
      </marquee>
      <marquee scrollamount="2">
        <i class="fas fa-basketball-ball ball2"></i>
      </marquee>
      <marquee scrollamount="4">
        <i class="fas fa-basketball-ball ball4"></i>
      </marquee>
      <marquee scrollamount="9">
        <i class="fas fa-basketball-ball ball9"></i>
      </marquee>
      <marquee scrollamount="5">
        <i class="fas fa-basketball-ball ball5"></i>
      </marquee>
      <!-- <marquee scrollamount="5">
        <div class="sad">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Michael_Jordan_crying.jpg/220px-Michael_Jordan_crying.jpg" alt="cry">
        </div>
      </marquee> -->
    </div>
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
  .background {
    background-image: url(../assets/cryingjordan.jpg);
    color: white;
  }
  .sad {
    width: 100px;
  }
  .available {
    margin: auto;
  }
  th, td {
    padding: 10px;
  }
  .fas {
    color: orange;
    font-size: 200%;
  }
  .ball1 {
    -webkit-animation: rotation 9s infinite linear;
    z-index: 10;
  }
  .ball2 {
    -webkit-animation: rotation 5s infinite linear;
    z-index: 10;
  }
  .ball3 {
    -webkit-animation: rotation 5s infinite linear;
    z-index: 10;
  }
  .ball4 {
    -webkit-animation: rotation 3s infinite linear;
    z-index: 10;
  }
  .ball5 {
    -webkit-animation: rotation 3s infinite linear;
    z-index: 10;
  }
  .ball6 {
    -webkit-animation: rotation 3s infinite linear;
    z-index: 10;
  }
  .ball7 {
    -webkit-animation: rotation 2s infinite linear;
    z-index: 10;
  }
  .ball8 {
    -webkit-animation: rotation 2s infinite linear;
    z-index: 10;
  }
  .ball9 {
    -webkit-animation: rotation 2s infinite linear;
    z-index: 10;
  }
  .ball10 {
    -webkit-animation: rotation 2s infinite linear;
    z-index: 10;
  }
  @-webkit-keyframes rotation {from {-webkit-transform: rotate(359deg)} to {-webkit-transform: rotate(0deg)}}
</style>
