<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
        resource: string
    }>(), {
        resource: 'page'
    }
)
</script>

<template>
    <h1>Oop!</h1>
    <h3>the {{ resource }} you're looking for is not here.</h3>
    <router-link :to="{ name: 'event-list-view'}">Back to the home page
    </router-link>
</template>