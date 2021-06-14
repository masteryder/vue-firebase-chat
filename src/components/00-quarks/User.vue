<template>
  <slot name="user" :user="user"></slot>
</template>

<script>
import { auth } from '../../firebase';
import { ref } from 'vue'

export default {

  setup() {
    const user = ref(null)
    const unsubscribe = auth.onAuthStateChanged(
      firebaseUser => user.value = firebaseUser
    );
    return {
      user,
      unsubscribe
    }
  },
  unmounted() {
    this.unsubscribe()
  }
}
</script>
