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

  <!-- Center the content horizontally and vertically -->
  <!-- Apply 'Droid Sans', 'Helvetica Neue', sans-serif as the font family -->
  <!-- Set the text color to a dark gray -->
  <!-- Ensure text is anti-aliased for better readability on screens -->
<template>
  <div class="text-center font-sans text-gray-700 antialiased">
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
