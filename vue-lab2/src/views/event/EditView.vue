<script setup lang="ts">
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'
const props = defineProps<{
    event: Event
}>()

const { event } = toRefs(props)
const store = useMessageStore()
const router = useRouter()

const editEvent = () => {
    store.updateMessage(`Event updated successfully!`)
    setTimeout(() => {
        store.resetMessage()
    }, 3000)
    router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>
<template>
    <p>Edit event here</p>
    <button @click="editEvent">Save Changes</button>
</template>