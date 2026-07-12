<script setup lang="ts">
    import type { StuInfo  } from '@/types'
    import StudentInformation from '@/components/StudenInfomation.vue'
    import { ref, onMounted } from 'vue'

    const studentInfos = ref<StuInfo[] | null>(null)

    onMounted(() => {
        fetch('https://dv-student-backend-2019.appspot.com/students')
            .then((response) => response.json())
            .then((data) => {
                studentInfos.value = data
            })
            .catch((error) => {
                console.error('There was an error!', error)
            })
    })

</script>

<template>
    <h1>Student Information</h1>
    <div class="student-info">
        <StudentInformation v-for="stuinfo in studentInfos" :key="stuinfo.id" :stuinfo="stuinfo" />
    </div>
</template>

<style scoped>
.student-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}
</style>