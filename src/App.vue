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

function handlePageSizeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  changePageSize(Number(target.value))
}
</script>

  <!-- Center the content horizontally and vertically -->
  <!-- Apply 'Droid Sans', 'Helvetica Neue', sans-serif as the font family -->
  <!-- Set the text color to a dark gray -->
  <!-- Ensure text is anti-aliased for better readability on screens -->
<template>
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">

        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'event-list-view' }">Event</RouterLink> | 
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'about' }">About</RouterLink> | 
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
          :to="{ name: 'student-info' }">Student Info</RouterLink>
        </nav>
      </div>
    </header>

    <div>
      <select @change="handlePageSizeChange">
        <option value="1">1 per page</option>
        <option value="2">2 per page</option>
        <option value="3">3 per page</option>
        <option value="4">4 per page</option>
        <option value="5">5 per page</option>
        <option value="6">6 per page</option>
      </select>
    </div>
    <RouterView :page-size="pageSize"  />
  </div>
</template>

<style>

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
  
</style>
