<template>
  <div class="nav-menu">
    <div class="logo" @click="logoClick">
      <img class="img" src="https://cn.vitejs.dev/logo.svg" alt="logo" />
      <span v-show="!isCollapse" class="title">Vue3Admin</span>
    </div>
    <el-menu
      router
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-openeds="defaultOpeneds"
      background-color="#363e58"
      active-text-color="#fff"
      :default-active="currentActiveMenu"
    >
      <template v-for="menu in menuList" :key="menu.id">
        <nav-menu-item :menu="menu" />
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { handleNavMenu, defaultOpeneds } from '@/utils/menu'
import { useUserStore } from '@/stores/modules/user'
export default defineComponent({
  name: 'NavMenu',
  components: {},
  props: {},
  emits: ['foldClick'],
  setup(props, { emit, slots }) {
    const route = useRoute()
    const menus = handleNavMenu(useUserStore().getUserMenus)
    const menuList = ref(menus[0].children || menus)
    const isCollapse = ref(false)
    let currentActiveMenu = ref('')
    watch(
      () => route.path,
      (newValue) => {
        currentActiveMenu.value = newValue.split('/').pop()
      }
    )
    const logoClick = () => {
      isCollapse.value = !isCollapse.value
      emit('foldClick', isCollapse.value)
    }
    return {
      route,
      menuList,
      isCollapse,
      defaultOpeneds,
      currentActiveMenu,
      logoClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  // logo 布局
  .logo {
    display: flex;
    height: 28px;
    line-height: 28px;
    background-color: #363e58;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
}
</style>
