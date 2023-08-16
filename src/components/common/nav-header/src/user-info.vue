<template>
  <div class="user-info-wrap">
    <el-dropdown @command="handleCommand">
      <div class="user-info">
        <el-icon><User /></el-icon>
        <!-- <span class="name">{{ userInfo.name }}</span> -->
        <span class="name">比克哈哈</span>
      </div>
      <template #dropdown>
        <el-dropdown-item
          v-for="{ command, lable } in commandList"
          :key="command"
          :command="command"
          >{{ lable }}</el-dropdown-item
        >
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { User } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'UserInfo',
  components: {
    User
  },
  setup() {
    const userInfo = useUserStore().getUserInfo
    const commandList = [{ command: 'logout', lable: '注销账号' }]
    const handleCommand = (command: string) => {
      switch (command) {
        case 'logout':
          window.location.href = userInfo.logoutUrl
          break

        default:
          break
      }
    }
    return {
      userInfo,
      handleCommand,
      commandList
    }
  }
})
</script>

<style lang="less" scoped>
.user-info-wrap {
  padding-right: 10px;
  font-family: PingFangSC-Regular, sans-serif;
  :focus-visible {
    outline: none;
  }
  .user-info {
    height: 50px;
    line-height: 50px;
    color: #ffffff;
    .el-icon {
      position: relative;
      top: 2px;
    }
    .name {
      font-size: 12px;
      padding-left: 4px;
    }
  }
}
</style>
