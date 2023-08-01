<template>
  <div class="nav-menu">
    <el-menu
      :default-active="currentActiveMenu"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      router
      :collapse="isCollapse"
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
import { handleMenu } from '@/router/menu'
import { useUserStore } from '@/stores/modules/user'
export default defineComponent({
  name: 'NavMenu',
  components: {},
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit, slots }) {
    const route = useRoute()
    const menus = handleMenu(useUserStore().getUserMenus)
    const menuList = ref(menus[0].children || menus)
    const isCollapse = ref<Boolean>(props.collapse)
    let currentActiveMenu = ref<String>('')
    watch(
      () => route.path,
      (newValue) => {
        currentActiveMenu.value = newValue.split('/').pop()
      }
    )
    return {
      route,
      menuList,
      isCollapse,
      currentActiveMenu
    }
  }
})
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
}
</style>
