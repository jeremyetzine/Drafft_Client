<template>
  <div class="containter">
    <div class="sign-out">
      <label @click="signOut">Sign out</label>
    </div>
    <div class="drafts">
      <h3> Draffts </h3>
      <div class="draft" v-for="draft in drafts">
        <a v-bind:href="'/drafts' + '/' + draft.id">{{draft.name}}</a>
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
   h3 {
     color: orange;
   }
  .sign-out {
    text-align: right;
    padding: 1%;
  }
  .draft {
    display: inline-block;
    margin: 0 10%;
  }
 </style>
