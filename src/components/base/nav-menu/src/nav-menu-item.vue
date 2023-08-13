<template>
  <div class="nav-menu-item">
    <el-menu-item
      v-if="!(menu.children && menu.children.length)"
      :index="menu.path"
      @click="handleClick('子菜单', menu)"
    >
      {{ menu.meta.name }}
    </el-menu-item>
    <el-sub-menu v-else :index="menu.path">
      <template #title>
        <el-icon><user /></el-icon>
        <span>{{ menu.meta.name }}</span>
      </template>
      <template v-for="cmenu in menu.children" :key="cmenu.id">
        <nav-menu-item :menu="cmenu" />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { User } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'NavMenuItem',
  components: {
    User
  },
  props: {
    menu: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, { emit, slots }) {
    const router = useRouter()
    const handleClick = (type, value) => {
      switch (type) {
        case '子菜单':
          router.push({ path: '/' + value.fullPath })
          break

        default:
          break
      }
    }
    return {
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu-item {
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .el-menu-item:hover,
  .el-menu-item.is-active {
    background-color: #567cff;
  }
}
</style>
<style lang="less">
.el-menu--collapse {
  .el-sub-menu__title {
    span,
    .el-sub-menu__icon-arrow {
      display: none;
    }
  }
}
</style>
