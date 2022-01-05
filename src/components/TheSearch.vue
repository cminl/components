<template>
  <div class="search-box">
    <div class="search-input">
      <PdSearch @search="search" :kw="value" ref="pd-search"></PdSearch>
      <!--        <el-badge :value="responseNum">-->
      <el-button size="mini" style="margin-left: 10px" @click="goResponse">助手回答</el-button>
    </div>
    <!--        </el-badge>-->
    <div class="word" v-if="responseWords&&responseWords.length">
      分词：
      <el-button size="mini" v-for="item in responseWords" :key="item.index">{{ item.word }}</el-button>
      <el-button type="text" class="correction">纠错</el-button>
    </div>
  </div>
</template>

<script>
import PdSearch from './pd-search/pd-search.vue'

export default {
  components: {
    PdSearch
  },
  props: {
    responseNum: {},
    responseWords: {},
    kw: {},
    placeholder: {}
  },
  data () {
    return {
      total: 0,
      dataList: [],
      // responseWords: [],
      aggList: [],
      // responseNum: 0,
      searchLoading: false, // 数据加载状态
      query: {
        docTypeList: ['PATENT'],
        kw: '',
        filters: [],
        pageNo: 1,
        pageSize: 5
      },
      value: ''
    }
  },
  watch: {
    'kw' (to, from) {
      this.value = to
    }
  },
  methods: {
    created () {
      this.value = this.kw
    },
    /**
     * 搜索
     */
    search (value) {
      this.$emit('search', value)
    },

    goResponse () {
      const value = this.$refs['pd-search']?.value ? this.$refs['pd-search']?.value : ''
      this.$emit('goResponse', value)
    }
  }
}
</script>

<style scoped lang="scss">
.search-box {
  min-height: 124px;
  background: white;
  box-shadow: 0 2px 4px $primary-line;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .search-input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56%;

    .el-button {
      flex-shrink: 0;
    }
  }

  .word {
    width: 56%;
    margin-top: 10px;

    .correction {
      color: $primary-font3-highlight;
    }
  }

  .link {
    padding: 6px 8px;
    margin: 0 16px;
    color: #909399;
    font-size: 14px;
    font-weight: bold;
    line-height: 18px;
    cursor: pointer;

    &:hover {
      color: #E94820;
    }

    &.active {
      color: #E94820;
    }
  }
}
</style>
