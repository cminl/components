<template>
  <el-scrollbar style="height: 100%;width: 100%;">
    <div class="search-detail">
      <div class="left">
        <span class="title">{{ dataList.title }}</span>
        <!--操作，收藏等-->
        <div class="operation">
          <el-button v-for="item in operation"
                     :key="item.name"
                     size="mini"
                     type="primary" :icon="item.icon">{{ item.name }}
          </el-button>
        </div>
        <resultTable
          v-loading="searchLoading"
          :data-list="dataList" v-if="dataList"></resultTable>
        <div class="related">
          <div class="line"><span>相关专利</span></div>
          <el-tabs type="border-card"
                   v-loading="searchLoading">
            <el-tab-pane :label="item.d" v-for="(item,i) in relatedPatent" :key="'patent'+i">
              <p v-for="(v,index) in item.v" :key="index+'v'" v-html="v" class="patent-item"></p>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
      <div class="right">
        <div v-loading="barChartLoading">
          <TheChart class="patent-chart"
                    :options="barOption"></TheChart>
        </div>
        <div v-loading="lineChartLoading">
          <TheChart class="patent-chart"
                    :options="lineOption"></TheChart>
        </div>

        <div v-loading="treeChartLoading">
          <TheChart class="patent-chart"
                    :options="treeOption"></TheChart>
        </div>
      </div>
    </div>
  </el-scrollbar>

</template>

<script>
import resultTable from './components/resultTable.vue'
import TheChart from '@/components/TheChart.vue'
import { apiSearch, pdAjax } from '@/api'
import ComponentMixins from '@/mixins/component-mixin'

export default {
  mixins: [ComponentMixins],
  components: {
    resultTable,
    TheChart
  },
  name: 'SearchDetail',
  data () {
    return {
      operation: [
        {
          icon: 'ic-insert-drive-file',
          name: '全文'
        },
        {
          icon: 'el-icon-share',
          name: '分享'
        },
        {
          icon: 'ic-file-download',
          name: '下载'
        }],
      barOption: {},
      lineOption: {},
      treeOption: {},
      searchLoading: false, // 数据加载状态
      barChartLoading: false, // 数据加载状态
      lineChartLoading: false, // 数据加载状态
      treeChartLoading: false, // 数据加载状态
      dataList: [],
      relatedPatent: []
    }
  },
  watch: {
    '$route' () {
      this.getData()
      this.setOptions()
    }
  },
  created () {
    this.getData()
    this.setOptions()
  },
  methods: {
    getData () {
      this.searchLoading = true
      const query = {
        docType: 'PATENT',
        docId: this.$route.params.id
      }
      pdAjax({ vm: this }, apiSearch.kgSearch_detail, { params: query }).then((data) => {
        const $data = data.data
        // this.total = $data.rsCount
        this.dataList = $data.rsData[0]
        this.relatedPatent = $data.similarData
        this.searchLoading = false
        this.handleClick()
      })
    },

    handleClick () {
      this.$nextTick(() => {
        const dialogBox = document.querySelectorAll('.patent-item span')
        dialogBox.forEach((item) => {
          item.onclick = () => {
            this.$router.push({
              name: 'searchDetail',
              params: { id: item.getAttribute('data') }
            })
          }
        })
      })
    },

    setOptions () {
      this.barChartLoading = true
      this.getChartData(0).then(($data) => {
        this.barChartLoading = false
        $data.series.forEach((item) => {
          item.type = 'bar'
        })
        this.barOption = {
          title: { text: $data.name },
          color: this.chartColors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: $data.xAxis.data
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: $data.series
        }
      })
      this.lineChartLoading = true
      this.getChartData(1).then(($data) => {
        this.lineChartLoading = false
        $data.series.forEach((item) => {
          item.type = 'line'
        })
        this.lineOption = {
          title: { text: $data.name },
          color: this.chartColors,
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: $data.xAxis.data
          },
          yAxis: {
            type: 'value'
          },
          series: $data.series
        }
      })
      this.treeChartLoading = true
      this.getChartData(2).then(($data) => {
        this.treeChartLoading = false
        this.treeOption = {
          title: { text: $data.name },
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: $data.children,
              top: '1%',
              left: '12%',
              bottom: '1%',
              right: '32%',
              symbolSize: 7,
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 10
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              },
              emphasis: {
                focus: 'descendant'
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        }
      })
    },

    getChartData (type) {
      const query = {
        type: type,
        esId: this.$route.params.id
      }
      return pdAjax({ vm: this }, apiSearch.kgSearch_analyse, { params: query }).then((data) => {
        return data.data
      })
    },

    getTreeData (type) {
      const query = {
        type: type,
        esId: this.$route.params.id
      }
      return pdAjax({ vm: this }, apiSearch.kgSearch_analyse, { params: query }).then((data) => {
        return data.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.search-detail {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  box-sizing: border-box;

  .left {
    width: 68%;
    height: max-content;
    box-sizing: border-box;
    background: $primary-bg-white;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48px;
      font-size: 18px;
      border-bottom: 1px solid $primary-line2;
    }

    .operation {
      display: flex;
      margin: 24px 24px 0;

      > span {
        display: flex;
        margin: 0 20px;
        line-height: 14px;

        &:hover {
          color: $primary !important;
        }

        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 10px;
        }
      }
    }

    .related {
      padding: 24px;

      .line {
        height: 2px;
        background: $primary;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 32px;

        > span {
          background: $primary-bg-white;
          padding: 0 40px;
        }
      }

      .el-tab-pane {
        p {
          font-size: 13px;
          line-height: 28px;
        }

        .patent-item {
          ::v-deep span {
            cursor: pointer;
            margin: 0 2px;
          }
        }
      }
    }
  }

  .right {
    width: 30%;
    box-sizing: border-box;

    .patent-chart {
      height: 340px;
      padding: 12px;
      width: 100%;
      background: $primary-bg-white;
      margin: 0 0 10px;

    }
  }
}
</style>
