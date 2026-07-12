<script setup lang="ts">
import type { StuInfo } from '@/types'
defineProps<{
  stuinfo: StuInfo
}>()
</script>

<template>
  <div class="stuinfo-class">
    <div class="stuinfo-card">
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

.stuinfo-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.stuinfo-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
