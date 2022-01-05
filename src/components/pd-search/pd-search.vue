<template>
  <div class="pd-search">
    <el-input placeholder="请输入搜索关键词..." v-model="value"
              @keyup.enter.native="handleSearch">
      <el-button slot="append" class="btn-search-icon" icon="el-icon-search" @click="handleSearch"></el-button>
    </el-input>
  </div>
</template>

<script>

export default {
  name: 'PdSearch',
  data () {
    return {
      value: '' // 搜索关键词
    }
  },
  props: {
    kw: {},
    placeholder: {}
  },
  watch: {
    'kw' (v) {
      this.value = v
    }
  },
  methods: {
    created () {
      this.value = this.kw
    },
    /**
     * 搜索
     */
    handleSearch () {
      this.$emit('search', this.value)
    }
  }

}
</script>

<style scoped lang="scss">
.pd-search {
  width: 100%;
  height: 48px;
  //margin: 0 auto;
  ::v-deep .el-input__inner {
    height: 46px;

    &:focus {
      border: 1px solid #DCDFE6;

    }
  }

  ::v-deep .el-input-group__append {
    background-color: $primary-bg-white;
    width: 72px;
    color: $primary-font;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
