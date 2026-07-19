<script setup lang="ts">
import type { Event } from '@/types'
defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="event-metadata">
    <p><strong>Category:</strong> {{ event.category }}</p>
    <p><strong>Organizer:</strong> {{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.event-metadata {
  text-align: right;
  padding: 10px 20px;
  font-size: 14px;
  border: 1px solid #39495c;
  width: 180px;        /* add this */
  box-sizing: border-box;
}

.event-metadata p {
  margin: 5px 0;
}
</style>

