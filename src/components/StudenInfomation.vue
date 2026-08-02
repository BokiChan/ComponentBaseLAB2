<script setup lang="ts">
import type { StuInfo } from '@/types'
defineProps<{
  stuinfo: StuInfo
}>()
</script>

<template>
  <div class="stuinfo-class">
    <div class="cursor-pointer border border-gray-300 p-[20px] w-[250px] mb-[18px]
    hover:scale-101 hover:shadow-sp">
      <h2>Name: {{ stuinfo.name }}</h2>
      <h2>Surname: {{ stuinfo.surname }}</h2>
      <p><strong>GPA:</strong> {{ stuinfo.gpa }}</p>
    </div>
  </div>
</template>

<style scoped>
.stuinfo-class {
  display: flex;
  justify-content: center;
}

</style>
