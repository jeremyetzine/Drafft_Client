<template>
  <div class="containter">
    <div class="sign-out">
      <label @click="signOut">Sign out</label>
    </div>
    <h2>{{drafts[0].name}}</h2>
    <hr>
    <h5>user2 is picking...</h5>
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
          <li>user1</li>
          <li>user2</li>
          <li>user3</li>
          <li>user4</li>
          <li>user5</li>
          <li>user6</li>
        </div>
        <div class="col-3">
          Your Team
          <hr>
          <div class="row yourTeam">
            <div class="col-5">
              <li>1: playername</li>
              <li>2: playername</li>
              <li>3: playername</li>
              <li>4: playername</li>
              <li>5: playername</li>
              <li>6: playername</li>
              <li>7: playername</li>
              <li>8: playername</li>
              <li>9: playername</li>
              <li>10: playername</li>
              <li>11: playername</li>
              <li>12: playername</li>
            </div>
            <div class="col-5">
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
              <li>PG</li>
            </div>
          </div>
        </div>
        <div class="col-6">
          Remaining Players
          <hr>
          <table class="available">
            <tr>
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
            <tr>
              <td>Name Name</td>
              <td>24.1</td>
              <td>12.2</td>
              <td>2.9</td>
              <td>1.0</td>
              <td>2.5</td>
              <td>52%</td>
              <td>71%</td>
              <td>0.2</td>
              <td>30%</td>
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
      drafts: []
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/drafts.json')
        .then(response => {
          this.drafts = response.data
          console.log(this.drafts)
        })
        .catch(error => this.setError(error, 'Something went wrong'))
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
    text-align: right;
    padding: 1%;
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
 </style>
