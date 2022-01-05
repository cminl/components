<template>
  <div class="patent-list">
    <TheSearch :response-num="responseNum"
               @search="search" :kw="query.kw"
               :response-words="responseWords"
               @goResponse="gotoPage('response',...arguments)"></TheSearch>
    <div class="main">
      <ResultLeft style="width: 20%"
                  :agg-list="aggList" @aggregationChange="aggregationChange"></ResultLeft>
      <ResultList style="width: 70%;margin:0 18px"
                  v-loading="searchLoading"
                  :total="total"
                  :page-no="query.pageNo"
                  :page-size="query.pageSize"
                  :data-list="dataList"
                  @page-change="handleCurrentChange"></ResultList>
      <div class="right-btn">
        <span @click="gotoPage('relation')"><i class="el-icon-s-marketing"></i>关联分析</span>
        <span @click="gotoPage('response')"><i class="el-icon-chat-line-round"></i>问答助手</span>
      </div>
      <!--            <ResultRight style="width: 23%"></ResultRight>-->
    </div>
  </div>
</template>

<script>
import TheSearch from '@/components/TheSearch.vue'
import ResultLeft from './components/resultLeft.vue'
import ResultList from './components/resultList.vue'
// import ResultRight from './components/resultRight.vue'
import { apiSearch, pdAjax } from '@/api'
import config from '@/config'

export default {
  components: {
    TheSearch,
    ResultLeft,
    ResultList
    // ResultRight
  },
  data () {
    return {
      total: 0,
      dataList: [],
      responseWords: [],
      aggList: [],
      responseNum: 0,
      searchLoading: false, // 数据加载状态
      query: {
        docTypeList: ['PATENT'],
        kw: '',
        filters: [],
        pageNo: 1,
        pageSize: 5
      }
    }
  },
  created () {
    this.getList(false)
  },
  methods: {
    gotoPage (...data) {
      const graphIds = this.$store.state.GRAPHINFO.graphInfoList
      const href = config.api.spaUrl + '/spa/container/u89_graph_baaef99f_checkerror_3_new/445a793dd0314abd875b7980d7ffbbd6/path?hideHeader=true&params=' + graphIds
      switch (data[0]) {
        case 'relation':
          window.open(href, '_blank')
          break
        case 'response':
          window.open(config.api.spaUrl + '/bot/pc.html?sysNum=16394464931366922' + (data[1] ? ('&kw=' + data[1]) : ''), '_blank')
          break
      }
    },
    search (val) {
      if (val) {
        this.query.kw = val
      }
      this.getList(false)
    },
    handleCurrentChange (page) {
      this.query.pageNo = page
      this.getList(true)
    },
    getList (filter) {
      this.searchLoading = true
      pdAjax({ vm: this }, apiSearch.kgSearch, { data: this.query }).then((data) => {
        this.searchLoading = false
        this.total = data.rsCount
        this.dataList = data.rsData
        this.responseWords = data.semanticData?.pdSegment
        if (!filter) {
          this.aggList = data.filters
        }
      })
    },
    aggregationChange (val) {
      this.query.filters = [JSON.parse(val)]
      this.query.pageNo = 1
      this.getList(true)
    }
  }
}
</script>

<style scoped lang="scss">
.patent-list {
  width: 100%;
  height: 100%;

  .main {
    width: 100%;
    height: calc(100% - 124px);
    padding: 24px 32px;
    display: flex;
    align-items: center;

    .right-btn {
      width: 100px;
      height: 180px;
      background: $primary-bg-white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50%;
        cursor: pointer;

        &:nth-of-type(1) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        }

        i {
          font-size: 36px;
          color: $primary-font;
        }
      }
    }
  }
}
</style>
