<template>
  <div class="nav-wrap">
    <div class="nav-left">
      <div class="nav-logo"></div>
    </div>
    <div class="nav-right">
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
export default defineComponent({
  name: 'NavHeader',
  components: { UserInfo },
  setup() {}
})
</script>

<style lang="less" scoped>
.nav-wrap {
  background: #3a3a3a;
  height: 50px;
  display: flex;
  justify-content: space-between;
}
</style>
