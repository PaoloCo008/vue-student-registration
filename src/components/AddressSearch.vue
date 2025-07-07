<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'

const input = ref('')
const foundItem = ref([])
const selected = ref(null)

const handleInput = useDebounceFn(async () => {
  try {
    let data = await (
      await fetch(`https://nominatim.openstreetmap.org/search?q=${input.value}&format=json`)
    ).json()

    const regex = new RegExp('(philippines)$', 'gim')

    data = data.filter((d) => regex.test(d.display_name))

    console.log(data)

    foundItem.value = data
  } catch (e) {}
}, 1000)

function handleSelect(selected) {
  console.log(selected.display_name.split(', '))
}

watch(input, handleInput)
</script>

<template>
  <el-input v-model="input" />
  <div v-if="foundItem.length > 0" class="wrapper">
    <ul>
      <li v-for="item in foundItem" :key="item.place_id" @click="handleSelect(item)">
        {{ item.display_name }}
      </li>
    </ul>
  </div>
  <div v-if="selected">
    <el-input value="" disabled />
    <el-input value="" disabled />
    <el-input value="" disabled />
    <el-input value="" disabled />
    <el-input value="" disabled />
  </div>
</template>

<style scoped>
.wrapper {
  background-color: white;
  width: 100%;
  position: absolute;
  top: 35px;
  height: 100px;
  z-index: 1;
  border-radius: 0.25rem;
  overflow: scroll;
}
</style>
