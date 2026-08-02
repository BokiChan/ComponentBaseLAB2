<script setup lang="ts">
  import EventCard from '@/components/EventCard.vue'
  import EventMetadata from '@/components/EventMetadata.vue'
  import type { Event } from '@/types'
  import { ref, onMounted, computed, watchEffect } from 'vue'
  import EventService from '@/services/EventService'
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
  const page = computed(() => props.page)
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
    <div class="event-wrapper" v-for="event in events || []" :key="event.id">
      <EventCard :event="event" />
      <EventMetadata :event="event"/>
    </div>
    <div class="pagination">
      <RouterLink id="page-prev"
      :to="{ name: 'event-list-view', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
      >&#60; Previous Page </RouterLink>

      <RouterLink id="page-next"
      :to="{ name: 'event-list-view', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
      > Next Page &#62;
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

  #page-prev {
    text-align: left;
  }

  #page-next {
    text-align: right;
  }
</style>
