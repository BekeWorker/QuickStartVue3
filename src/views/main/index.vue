<template>
  <div class="main-wrap">
    <el-container class="main-content">
      <el-header>
        <nav-header />
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '62px' : '210px'">
          <nav-menu @foldClick="handleFoldClick" />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavHeader from '@/components/base/nav-header'
import NavMenu from '@/components/base/nav-menu'
export default defineComponent({
  name: 'MainIndex',
  components: {
    NavHeader,
    NavMenu
  },
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

<style lang="less" scoped>
.main-wrap {
  background: #f5f8fc;
  .el-header {
    height: 50px;
    line-height: 50px;
    padding: 0;
  }
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    text-align: left;
    cursor: pointer;
    height: calc(100vh - 50px);
    background-color: #363e58;
    // transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    padding: 0;
    margin: 10px;
    text-align: center;
    background: #ffffff;
    border-radius: 2px;
    height: calc(100vh - 70px);
  }
}
</style>
