<template>
  <div class="the-container">
    <TheHeader/>
    <div class="main-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  name: 'TheContainer',
  components: {
    TheHeader
  },
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
.the-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  /*background: #13131A;*/

  ::v-deep .el-scrollbar {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }

  .main-box {
    background: $primary-bg;
    display: flex;
    justify-content: space-between;
    /*width: 1280px;*/
    border-top: 1px solid $primary-line;
    box-shadow: 0 1px 2px $primary-line;
    margin: auto;
    width: 100%;
    height: calc(100% - 60px);
    //padding: 0 36px;
  }
}

</style>
