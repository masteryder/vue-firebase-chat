<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button class="button" @click="auth.signInAnonymously()" id="sign-anonymous">Sign In</button>

    <div>
      <a v-if="newUser" @click="() => {newUser = false}">Already have an account?</a>
      <a v-else @click="() => {newUser = true}">New user?</a>
    </div>

    <label for="email">Email
      <input class="input" id="email" type="email" v-model="email">
    </label>
    <label for="password">Password
      <input class="input" id="password" type="password" v-model="password">
    </label>

    <button class="button is-info" :class="{'is-loading': loading}" @click="signInOrCreateUser(email, password)">{{newUser ? 'Create account' : 'Login'}}</button>

    <p class="has-text-danger" v-if="errorMessage">{{errorMessage}}</p>
    <div>{{email}} - {{password}}</div>

  </aside>
</template>

<script>
  import {auth} from '../../firebase';

  export default {
    data() {
      return {
        auth,
        newUser: false,
        email: '',
        password: '',
        loading: false,
        errorMessage: ''
      }
    },
    methods: {

      async signInOrCreateUser(){
        this.loading = true;
        this.errorMessage = '';
        try {
          if(this.newUser == true){
            await auth.createUserWithEmailAndPassword(this.email, this.password)
          }
          else{
            await auth.signInWithEmailAndPassword(this.email, this.password)
          }
          this.loading = false;
        }
        catch(error){
          this.errorMessage = error.message;
          this.loading = false;
        }
      }
    }
  }
</script>