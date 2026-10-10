<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'
import { type Event } from '@/types'
import EventService from '@/services/EventService'

const props = defineProps<{
    event: Event
}>()

const imageUrls = ref<string[]>([])
const { event } = toRefs(props)

watch(
  () => event.value, // or () => props.event
  async (newEvent) => {
    if (newEvent?.images?.length) {
      imageUrls.value = await EventService.getEventImages(newEvent.images)
    } else {
      imageUrls.value = []
    }
  },
  { immediate: true },
)
</script>
<template>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <div class="flex flex-row flex-wrap justify-center">
    <img
      v-for="image in imageUrls"
      :key="image"
      :src="image"
      alt="events image"
      class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-60 hover:shadow-lg"
    />
  </div>
</template>