<script setup lang="ts">
import useUrl from '@/composables/useUrl'
import { PAGE_SIZE } from '@/lib/constants'
import { useStudentStore } from '@/stores/StudentsStore'

const studentStore = useStudentStore()

const pageRef = useUrl('page', String(1), 'homepage')

function handleClick(pageNumber: string) {
  pageRef.value = String(pageNumber)
}
</script>

<template>
  <el-pagination
    size="large"
    @change="handleClick"
    hide-on-single-page
    :page-size="PAGE_SIZE"
    :pager-count="5"
    layout="prev, pager, next"
    :total="studentStore.getTotalStudentCount"
  />
</template>

<style>
.el-pagination {
  align-self: center;
}
</style>
