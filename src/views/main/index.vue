<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
    </el-container>
    <el-container>
      <el-header>
        <nav-header @foldClick="handleFoldClick" />
      </el-header>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainIndex',
  components: {},
  setup() {
    const isCollapse = ref(false)
    const handleFoldClick = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFoldClick
    }
  }
})
</script>

<style lang="less" scoped></style>
