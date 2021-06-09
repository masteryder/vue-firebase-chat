<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button @click="auth.signInAnonymously()" id="sign-anonymous">Sign In</button>
  </aside>
</template>

<script>
  import {auth} from '../../firebase';

  export default {
    data() {
      return {
        auth,
      }
    }
  }
</script>