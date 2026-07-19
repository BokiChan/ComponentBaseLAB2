<script setup lang="ts">
  import EventCard from '@/components/EventCard.vue'
  import EventMetadata from '@/components/EventMetadata.vue'
  import type { Event } from '@/types'
  import { ref, onMounted } from 'vue'
  import EventService from '@/services/EventService'
  const events = ref<Event[] | null>(null)

  onMounted(() => {
    EventService.getEvents()
    .then((response) => {
      console.log(response.data)
      events.value = response.data
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
  })
</script>

<template>
  <h1>Event For Good</h1>
  <div class="events">
    <div class="event-wrapper" v-for="event in events || []" :key="event.id">
      <EventCard :event="event" />
      <EventMetadata :event="event"/>
    </div>
  </div>
</template>

<style scoped>
  .events {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .event-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 10px;

  }
</style>
