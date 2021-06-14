<script>
  // import HelloWorld from '../HelloWorld.vue'
  import Login from '../01-atoms/Login.vue'
  import User from '../00-quarks/User.vue'
  import UserProfile from '../02-molecules/UserProfile.vue'
  import ChatList from '../03-organisms/ChatList.vue';

  export default{
    components: {
      // HelloWorld,
      Login,
      User,
      UserProfile,
      ChatList
    }
  }



</script>

<template>
  <h3>Home</h3>
  <User>
    <template v-slot:user="{user}">
      <div v-if="user">
        <UserProfile :user="user" />
        <ChatList :uid="user.uid" />
      </div>
      <Login v-else />
    </template>
  </User>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>