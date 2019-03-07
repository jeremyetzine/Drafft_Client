<template>
  <div class="containter">
    <label class="loggedInAs">
      You are logged in as: &nbsp; <strong>{{users[currentUserID - 1].username}}</strong>
    </label>
    <div class="sign-out">
      <router-link to="/squad">Your Squad</router-link>
      <label @click="signOut">Sign out</label>
    </div>
    <h2>{{draft.name}}</h2>
    <hr>
    <h5>{{users[0].username}} is picking...</h5>
    <div class="timer">
      :30
    </div>
    <br>
    <br>
    <div class="col-container">
      <div class="row">
        <div class="col-3">
          Round 1
          <hr>
          <li v-for="user in users">
            {{user.username}}
          </li>
        </div>
        <div class="col-3">
          Your Team is the <strong><u>{{squads[currentUserID-1].name}}</u></strong>
          <hr>
          <div class="row yourTeam">
            <div class="col-5">
              <!-- <li><strong>Teams</strong></li>
              <li v-for="team in squads.teams">
                {{team.name}}
              </li>
              <hr> -->
              <li><strong>Players</strong></li>
              <li v-for="player in squads[currentUserID-1].players">
                {{player.name}}
              </li>
            </div>
            <div class="col-5">
              <!-- <br>
              <li v-for="team in squads.teams">
                {{team.abbr}}
            </li>
              <hr> -->
              <li><strong>Position</strong></li>
              <li v-for="player in squads[currentUserID-1].players">
                {{player.position}}
              </li>
            </div>
          </div>
        </div>
        <div class="col-6">
          Remaining Players
          <hr>
          <table class="available">
            <tr>
              <th></th>
              <th>Name</th>
              <th>PTS</th>
              <th>RB</th>
              <th>AST</th>
              <th>STL</th>
              <th>BLK</th>
              <th>FG%</th>
              <th>FT%</th>
              <th>3PM</th>
              <th>3P%</th>
            </tr>
            <tr v-for="player in players">
              <td>
                <input type="checkbox" :value="player.name" v-on:change="addToSquad">
              </td>
              <td>{{player.name}}</td>
              <td>{{player.pts}}</td>
              <td>{{player.rb}}</td>
              <td>{{player.ast}}</td>
              <td>{{player.stl}}</td>
              <td>{{player.blk}}</td>
              <td>{{player.fgperc}}%</td>
              <td>{{player.ftperc}}%</td>
              <td>{{player.threepm}}</td>
              <td>{{player.threeperc}}%</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      draft: [],
      players: [],
      users: [],
      currentUserID: [],
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
    this.getPlayers()
    this.getUsers()
    this.getSquads()
    // this.addToSquad()
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
    getPlayers () {
      this.$http.secured.get('/players.json')
        .then(response => {
          this.players = response.data
          console.log('players', this.players)
        })
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
    },
    addToSquad () {
      this.$http.secured.put('/players/1.json', {
        squad_id: this.currentUserID
      })
        .then(response => {
          this.updateSquad(response)
        })

    },
    async updateSquad (response) {
      this.$http.secured.get('/squads.json')
        .then(response => {
          this.squads = response.data
        })
      await this.$nextTick()
      console.log('squads again', this.squads)
    }
  }
}
</script>

 <style>
   h2 {
     color: orange;
     margin-bottom: -14px;
     margin-top: -20px;
   }
   h5 {
     color: orange;
     display: inline-block;
     float: left;
     margin-left: 20%;
   }
   hr {
     background-color: orange;
   }
  .sign-out {
    display: flex;
    padding: 0 1%;
    justify-content: space-between;
  }
  .draft {
    display: inline-block;
    margin: 0 10%;
  }
  .col-2, .col-3, .col-6 {
    border: 1px solid orange;
    padding-left: 0;
    padding-right: 0;
  }
  li {
    list-style-type: none;
  }
  .yourTeam {
    justify-content: center;
  }
  .timer {
    display: inline-block;
    float: right;
    margin-right: 5%;
    font-size: 200%;
    margin-top: -8px;
  }
  .available {
    margin: auto;
  }
  th, td {
    padding: 10px;
  }
  .loggedInAs {
    display: flex;
    padding: 1%;
    padding-bottom: 0;
  }
 </style>
