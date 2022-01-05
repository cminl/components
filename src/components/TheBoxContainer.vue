<template>
  <div class="box-container">
    <div class="box-head">
      <span class="title" v-if="title">{{ title }}</span>
      <slot v-else name="head"/>
    </div>
    <div class="box-content">
      <el-scrollbar style="height:100%" slot="content">
        <slot name="content"/>
      </el-scrollbar>
      <slot name="page"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TheBoxContainer',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.box-container {
  background: white;
  height: 100%;
  margin-bottom: 20px;

  .box-head {
    border-bottom: 2px solid #E4E7ED;
    height: 40px;
    font-size: 12px;
    font-weight: bold;
    color: #303133;

    .title {
      margin: 12px;
      line-height: 40px;
    }
  }

  .box-content {
    height: calc(100% - 50px);
    //height: 100%;
  }

  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
