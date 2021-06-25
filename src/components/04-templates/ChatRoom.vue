<template>
  <h3>Welcome to chatroom {{chatId}}</h3>
  <User>
    <template v-slot:user="{user}">
      <div v-if="user">

        <div class="chatWindow">
          <ul>
            <li v-for="message of messages" :key="message.id">
              <ChatMessage
                :message="
                  {
                    text: message.text,
                    sender: user.uid,
                    timestamp: message.timestamp,
                    audioURL: message.audioURL
                  }"
                :owner="message.sender === user.uid"
              />
            </li>
          </ul>
        </div>
        <div class="chatActions">
          <input id="message" class="input" v-model="curMessage" type="text" />
          <button @click="sendMessage(user.uid)" class="button is-success" :disabled="!curMessage || loading">Send</button>

          <button v-if="!recorder" @click="record()" class="button"><i class="fas fa-microphone"></i></button>
          <button v-else @click="stop()" class="button"><i class="fas fa-stop-circle"></i></button>
        </div>
        <audio class="audioPreview" v-if="newAudio" :src="newAudioURL" controls></audio>
      </div>
      <Login v-else />
    </template>
  </User>
</template>

<style scoped lang="scss">
@import "bulma/sass/utilities/mixins.sass";
button .fas{
  width: 16px;
}
.chatWindow{
  background-color: rgb(14, 20, 24);
  padding-left: 8rem;
  padding-right: 8rem;
  padding-bottom: 1.5rem;
  height: 50vh;
  overflow-y: auto;
}

.chatActions{
  display: flex;
  margin-top: 1rem;
}
.chatActions input, .chatActions button{
  margin-right: .8rem;
}
@include mobile(){
  .chat-message{
    max-width: 100%;
  }
  .chatWindow{
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.audioPreview{
  margin-left: auto;
  display: block;
  margin-top: .8rem;
}


</style>

<script>
import Login from '../01-atoms/Login.vue'
import User from '../00-quarks/User.vue'
import ChatMessage from '../01-atoms/ChatMessage.vue'

import {db, storage} from '../../firebase';

export default {
  components: {
    Login,
    User,
    ChatMessage
  },
  data(){
    return {
      curMessage: '',
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null
    }
  },
  computed: {
    chatId(){
      return this.$route.params.id;
    },
    messagesCollection(){
      return db.doc(`chats/${this.chatId}`).collection('messages');
    },
    newAudioURL(){
      return URL.createObjectURL(this.newAudio);
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

      let audioURL = null;

      const {id: messageId} = this.messagesCollection.doc();

      if (this.newAudio){
        const storageRef = storage.ref('chats').child(this.chatId).child(`${messageId}.wav`);
        await storageRef.put(this.newAudio);
        audioURL = await storageRef.getDownloadURL();
      }
      try{
        await this.messagesCollection.doc(messageId).set({
          createdAt: Date.now(),
          sender: uid,
          text: this.curMessage,
          audioURL
        });
        this.curMessage = '';
        this.newAudio = null;
      }
      catch(error)
      {
        console.error(error.message);
      }
      finally{
        this.loading = false;
      }
    },
    async record(){
      this.newAudio = null;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })
      const options = {mimeType: "audio/webm"};
      const recorderChunks = [];
      this.recorder = new MediaRecorder(stream, options);

      this.recorder.addEventListener("dataavailable", e=>{
        if(e.data.size > 0){
          recorderChunks.push(e.data);
        }
      });
      this.recorder.addEventListener("stop",()=>{
        this.newAudio = new Blob(recorderChunks);
        console.log(this.newAudio)
      });
      this.recorder.start();
    },
    async stop(){
      this.recorder.stop();
      this.recorder = null;
    }

  }

}
</script>