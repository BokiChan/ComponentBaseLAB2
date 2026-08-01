<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)

const pageSize = ref(2)

function changePageSize(newPageSize: number) {
  pageSize.value = newPageSize
}
</script>


<template>
  <div id="layout">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink> | 
          <RouterLink :to="{ name: 'about' }">About</RouterLink> | 
          <RouterLink :to="{ name: 'student-info' }">Student Info</RouterLink>
        </nav>
      </div>
    </header>
    <div>
      <button @click="changePageSize(1)">1 per page</button>
      <button @click="changePageSize(2)">2 per page</button>
      <button @click="changePageSize(3)">3 per page</button>
      <button @click="changePageSize(4)">4 per page</button>
      <button @click="changePageSize(5)">5 per page</button>
      <button @click="changePageSize(6)">6 per page</button>
    </div>
    <RouterView :page-size="pageSize"  />
  </div>
</template>

<style>
#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

h2 {
  font-size: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
  }

@keyframes yellowFade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellowFade 3s ease-in-out;
}
</style>
