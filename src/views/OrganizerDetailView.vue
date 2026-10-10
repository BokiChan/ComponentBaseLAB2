<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import OrganizationService from '@/services/OrganizationService'
import type { Organizer } from '@/types'

const props = defineProps<{ id: string }>()
const router = useRouter()

const organizer = ref<Organizer | null>(null)
const imageUrl = ref('')

async function load(id: string) {
  try {
    const response = await OrganizationService.getOrganizer(parseInt(id))
    organizer.value = response.data
    imageUrl.value = organizer.value?.image
      ? await OrganizationService.getImageUrl(organizer.value.image)
      : ''
  } catch {
    router.push({ name: 'network-error-view' })
  }
}

watch(() => props.id, (id) => load(id), { immediate: true })
</script>

<template>
  <div v-if="organizer">
    <h1>{{ organizer.name }}</h1>
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="organizer image"
      class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-60 mx-auto hover:shadow-lg"
    />
  </div>
</template>