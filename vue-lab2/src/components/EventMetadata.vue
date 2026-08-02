<script setup lang="ts">
import type { Event } from '@/types'
defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="text-right text-sm border border-gray-700 w-[180px] px-5 py-2.5">
    <p class="my-1">
      <strong>Category:</strong> {{ event.category }}
    </p>
    <p class="my-1">
      <strong>Organizer:</strong> {{ event.organizer }}
    </p>
  </div>
</template>




