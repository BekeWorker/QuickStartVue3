<template>
  <main-index />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useUserStore } from './stores/modules/user'
import MainIndex from './views/main/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    MainIndex
  },
  setup() {
    onMounted(() => {
      initData()
    })
    const userStore = useUserStore()
    async function initData() {
      await userStore.login()
    }
    return {
      initData
    }
  }
})
</script>

<style></style>
