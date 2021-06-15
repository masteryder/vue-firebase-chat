<template>
  <h3>Welcome to chatroom {{chatId}}</h3>
  <User>
    <template v-slot:user="{user}">
      <div v-if="user">
        <ul>
          <li v-for="message of messages" :key="message.id">
            {{message.text}} <sup>{{message.createdAt}}</sup>
          </li>
        </ul>

        <label for="message" />
        <input id="message" class="input" v-model="curMessage" type="text"/>
        <button @click="sendMessage(user.uid)" class="button is-success" :disabled="!curMessage || loading">Send</button>
      </div>
      <Login v-else />
    </template>
  </User>
</template>

<script>
import Login from '../01-atoms/Login.vue'
import User from '../00-quarks/User.vue'

import {db} from '../../firebase';

export default {
  components: {
    Login,
    User
  },
  data(){
    return {
      curMessage: '',
      loading: false,
      messages: []
    }
  },
  computed: {
    chatId(){
      return this.$route.params.id;
    },
    messagesCollection(){
      return db.doc(`chats/${this.chatId}`).collection('messages');
    }
  },
  firestore(){
    return {
      messages: this.messagesCollection.orderBy('createdAt').limitToLast(10)
    }
  },
  methods: {
    async sendMessage(uid){
      this.loading = true;

      const {id: messageId} = this.messagesCollection.doc();

      try{
        await this.messagesCollection.doc(messageId).set({
          createdAt: Date.now(),
          sender: uid,
          text: this.curMessage
        });
        this.curMessage = '';
      }
      catch(error)
      {
        console.error(error.message);
      }
      finally{
        this.loading = false;
      }
    },

  }

}
</script>