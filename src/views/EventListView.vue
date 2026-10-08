<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventMetadata from '@/components/EventMetadata.vue'
import type { Event } from '@/types'
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import EventService from '@/services/EventService'
import BaseInput from '@/components/BaseInput.vue'
const events = ref<Event[] | null>(null)

const totalEvent = ref<number>(0)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 2)
  return page.value < totalPages
})
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 2
  }
})

const router = useRouter()
const page = computed(() => props.page)
const keyword = ref('')

function updateKeyword() {
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(3, page.value)
  } else {
    queryFunction = EventService.getEventByKeyword(keyword.value, 3, page.value)
  }
  queryFunction.then((response) => {
    events.value = response.data
    console.log('events', events.value)
    totalEvent.value = response.headers['x-total-count']
    console.log('totalEvent', totalEvent.value)
  }).catch(() => {
    router.push({ name: 'network-error-view' })
  })
}
watchEffect(() => {
  events.value = null
  EventService.getEvents(props.pageSize, page.value)
    .then((response) => {
      console.log(response.data)
      events.value = response.data
      totalEvent.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
  <h1>Event For Good</h1>
  <div class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        label="Search events"
        @input="updateKeyword"
        class="w-full"/>
    </div>
    <div class="event-wrapper" v-for="(event, index) in events || []" :key="event.id ?? index">
      <EventCard :event="event" />
      <EventMetadata :event="event" />
    </div>
    <div class="pagination">
      <RouterLink class="text-left" :to="{ name: 'event-list-view', query: { page: page - 1 } }" rel="prev"
        v-if="page != 1">&#60; Previous Page </RouterLink>

      <RouterLink class="text-right" :to="{ name: 'event-list-view', query: { page: page + 1 } }" rel="next"
        v-if="hasNextPage"> Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.event-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 10px;

}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
</style>
