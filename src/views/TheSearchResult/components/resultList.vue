<template>
  <TheBoxContainer class="list-container">
    <div slot="head" class="head">
      <span>找到 <i style="font-style: normal;color: rgba(255, 0, 0, 0.8)">{{ total }}</i> 条相关结果</span>
      <div class="mySwitch">
        <div class="switch"
             :class="{active:isActive===item}"
             v-for="(item,i) in tabs"
             :key="i"
             @click="changeSWitch(item)">
          {{ item }}
          <div class="sort-icon" v-if="item!=='相关度'">
            <i class="el-icon-caret-top" :style="{color: isActive!=='相关度' && sort?'#E94820':'#C0C4CC'}"></i>
            <i class="el-icon-caret-bottom"
               :style="{color: isActive!=='相关度' && !sort?'#E94820':'#C0C4CC'}"></i>
          </div>
        </div>
      </div>
    </div>
    <div slot="content" class="content" v-if="searchList&&searchList.length">
      <div v-for="(item,i) in searchList" :key="i" class="content-item">
        <div class="top">
          <!--title-->
          <!--                    <el-tooltip :content="item.title" placement="top">-->
          <span v-html="item.title" @click="goDetail(item)"></span>
          <!--                    </el-tooltip>-->
        </div>
        <div class="applicants">
          {{ item.publicationNumber }}
          <!--                    <span v-for="(author,i) in item.authors" :key="i" v-html="author"></span>-->
          <span v-for="(applicants,i) in item.applicants" :key="i" v-html="applicants"></span>
        </div>
        <!--内容-->
        <div class="content-text">
          <p v-html="item.abs"></p>
        </div>
        <div class="publication">
          <span>公开号：{{ item.publicationNumber }}</span>

          <!--操作，收藏等-->
          <div class="operation">
                        <span
                          :class="{active:operationItem.name==='分析'&&item.isAnalyse}"
                          v-for="operationItem in operation"
                          :key="operationItem.name"
                          @click="handleOperation(operationItem.name,item)"
                        ><i :class="operationItem.icon"></i>{{ operationItem.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      slot="page"
      layout="total, prev, pager, next"
      :total="total"
      :page-size='pageSize'
      :current-page="pageNo">
    </el-pagination>
  </TheBoxContainer>
</template>
<script>
import TheBoxContainer from '@/components/TheBoxContainer.vue'
import * as _ from 'lodash'

export default {
  name: 'ResultList',
  components: {
    TheBoxContainer
  },
  data () {
    return {
      sort: false,
      isActive: '相关度',
      tabs: ['相关度', '发布时间'],
      searchList: [],
      operation: [
        {
          icon: 'ic-note-add',
          name: '分析'
        },
        {
          icon: 'ic-insert-drive-file',
          name: '全文'
        },
        {
          icon: 'ic-file-download',
          name: '下载'
        }]
    }
  },
  props: {
    total: { default: 0 },
    pageNo: { default: 0 },
    pageSize: { default: 5 },
    dataList: { default: null },
    attribute: { default: null }
  },
  watch: {
    '$route' () {
      this.$store.commit('GRAPHINFO/setGraphInfoList', [])
      this.sort = false
      this.isActive = '相关度'
    },
    'dataList' () {
      if (this.dataList) {
        this.searchList = _.cloneDeep(this.dataList)
        this.searchList.forEach((item) => {
          this.$set(item, 'isAnalyse', false)
        })
        this.$store.commit('GRAPHINFO/setGraphInfoList', [])
      }
    }
  },
  methods: {
    goDetail (item) {
      this.$router.push({
        name: 'searchDetail',
        params: { id: item.docId }
      })
    },

    changeSWitch (item) {
      console.log(item)
    },

    handleOperation (type, item) {
      switch (type) {
        case '分析':
          this.$set(item, 'isAnalyse', !item.isAnalyse)
          this.setGraphIds(item)
          break
      }
    },

    setGraphIds (item) {
      const graphIds = this.$store.state.GRAPHINFO.graphInfoList
      if (item.isAnalyse) {
        if (graphIds.length > 1) {
          this.$message.info('关联分析暂只支持两个！')
          this.$set(item, 'isAnalyse', false)
        } else {
          if (item.graphId) {
            graphIds.push(item.graphId)
          }
          this.$store.commit('GRAPHINFO/setGraphInfoList', graphIds)
        }
      } else {
        graphIds.splice(_.indexOf(graphIds, item.graphId), 1)
        this.$store.commit('GRAPHINFO/setGraphInfoList', graphIds)
      }
    },

    /*
     * 分页
     * */
    handleCurrentChange (value) {
      this.$emit('page-change', value)
    }
  }
}
</script>

<style scoped lang="scss">
.list-container {
  height: 100%;

  .head {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;

    .mySwitch {
      background: #EBEEF5;
      width: 140px;
      height: 30px;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;

      .switch {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 49%;
        height: 88%;
        cursor: pointer;
        transition: all .2s linear;

        color: #909399;

        &.active {
          background: white;
          border-radius: 50px;
          color: #303133;
        }
      }

      .sort-icon {
        margin-top: 3px;

        i:nth-of-type(1) {
          display: block;
          margin-bottom: -6px;
        }
      }
    }
  }

  .content {
    /*height: calc(100% - 58px);*/
    .content-item {
      padding: 16px 12px;
      border-bottom: 1px solid $primary-line;
    }

    .top {
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      line-height: 18px;
      color: $primary-font5;

      &:hover {
        color: $primary;
      }

      > span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 72%;
      }
    }

    .applicants {
      color: $primary-font4;
      margin: 12px 0;
      font-size: 13px;

      span {
        margin-right: 6px;
      }
    }

    .publication {
      font-size: 13px;
      line-height: 18px;
      color: $primary-font3-gray;
      display: flex;
      justify-content: space-between;

      .operation {
        display: flex;

        > span {
          display: flex;
          margin: 0 20px;
          line-height: 14px;
          cursor: pointer;
          align-items: center;
          justify-content: center;

          &.active {
            color: $primary !important;
          }

          &:hover {
            color: $primary !important;
          }

          i {
            display: inline-block;
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .content-text {
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      margin: 12px 0;

      p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
    }

    .bottom {
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
      color: #606266;
      margin-top: 12px;

      > span {
        &:nth-of-type(2) {
          margin: 0 32px;
        }
      }
    }
  }

  ::v-deep .el-scrollbar {
    height: calc(100% - 52px) !important;
  }

  ::v-deep .el-pagination {
    margin: 10px auto;
    text-align: center;
  }
}
</style>
