<template>
    <div :class="`chat-message${owner ? ' chat-message--mine' : ' chat-message--theirs'}`">
      {{message.text}}
      <audio v-if="message.audioURL != null" :src="message.audioURL" controls></audio>
      <div class="sender">from {{owner ? 'you' : message.sender}}</div>
    </div>
</template>

<script>
export default {
  props: ['message','owner']
}
</script>

<style lang="scss">
@import "bulma/sass/utilities/mixins.sass";

:root {
  --color-bg-mine: rgb(40, 95, 97);
  --color-bg-theirs: rgb(39, 45, 49);
}
.chat-message{
  position: relative;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  color: white;
  max-width: 50%;
  width: fit-content;
  z-index: 2;
}
.chat-message .sender{
  font-size: .8rem;
  opacity: 50%;
  text-align: right;
}

.chat-message--theirs{
  background-color: var(--color-bg-theirs);
  border-top-right-radius: 1rem;
}
.chat-message--mine{
  margin-left: auto;
  background-color:  var(--color-bg-mine);
  text-align: right;
  border-top-left-radius: 1rem;
}
.chat-message--theirs::before{
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 25px solid var(--color-bg-theirs);
  border-left: 25px solid transparent;
}
.chat-message--mine::after{
  content: '';
  position: absolute;
  top: 0;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 25px solid var(--color-bg-mine);
  border-right: 25px solid transparent;
}
audio{
  display: block;
}
</style>



