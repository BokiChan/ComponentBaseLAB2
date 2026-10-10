<script setup lang="ts">
import type { Organizer } from '@/types'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import OrganizationService from '@/services/OrganizationService'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'

const organizer = ref<Organizer>({
  id: null,
  name: '',
  image: '',
})

// ImageUpload works with string[], but an organizer has only 1 image.
// This keeps only the latest uploaded image.
const imageList = computed<string[]>({
  get: () => (organizer.value.image ? [organizer.value.image] : []),
  set: (val) => {
    organizer.value.image = val.length ? val[val.length - 1] : ''
  },
})

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  OrganizationService.saveOrganizer(organizer.value)
    .then((response) => {
      router.push({
        name: 'organizer-detail-view',
        params: { id: response.data.id },
      })
      store.updateMessage('You have successfully added a new organizer ' + response.data.name)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch((error) => {
      console.error('saveOrganizer failed:', error)
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div>
    <h1>Create an organizer</h1>

    <form @submit.prevent="saveOrganizer">
      <h3>Name your organizer</h3>
      <BaseInput v-model="organizer.name" type="text" label="Name" />

      <h3>The image of the Organizer</h3>
      <ImageUpload v-model="imageList" />

      <button
        class="flex w-fit mx-auto items-center justify-center h-13 px-10
        rounded-md font-semibold whitespace-nowrap border border-gray-400
        focus:border-emerald-500 transition-all duration-200 ease-linear hover:scale-105
        hover:border-emerald-500 hover:shadow-lg active:scale-100 focus:outline-none"
        type="submit"
      >
        Submit
      </button>
    </form>

    <pre>{{ organizer }}</pre>
  </div>
</template>