<template>
  <div class="table-content">
    <table border="1" style="border-collapse: collapse; border-bottom-width: 0">
      <tr v-for="(item,key) of patentData" :key="key" v-show="patentData[key]">
        <td class="table-left">【 {{ patentData[ key ] }} 】</td>
        <td v-if="typeof dataList[key] === 'object' && dataList[key] && dataList[key].length">
          <p v-for="(p,i) in dataList[key]" :key="'p'+i"
             class="table-item"
             v-html="i === dataList[key].length - 1 ? (p.name ? p.name : p) : ((p.name ? p.name : p) + '、')">
          </p>
        </td>
        <td v-else>
          <p class="table-item"
             v-if="key==='type'"
             v-html="dataList[key]==='INVENTION'?'发明专利':(dataList[key]==='UTILITY'?'实用新型专利':'外观专利')"></p>
          <p v-else class="table-item" v-html="dataList[key]||'无'"></p>
        </td>
      </tr>
    </table>
    <el-dialog
      :title="dialogData.kw"
      :visible.sync="dialogVisible"
      center
      :style="styleObj"
      :modal="false"
      :before-close="handleClose">
            <span v-if="dialogData && dialogData.rsData && dialogData.rsData.length">{{
                dialogData.rsData[ 0 ].contents[ 0 ]
              }}</span>
    </el-dialog>
  </div>
</template>
<script>
import { apiSearch, pdAjax } from '@/api'

export default {
  name: 'ResultTable',
  components: {},
  props: { dataList: {} },
  data () {
    return {
      dialogVisible: false,
      dialogData: {},
      styleObj: {
        top: 0,
        left: 0
      }
    }
  },
  watch: {
    'dataList' () {
      if (this.dataList) {
        this.handleClick()
      }
    },
    '$route' () {
      this.handleClick()
    }
  },
  created () {
    this.handleClick()
  },
  methods: {
    handleClick () {
      this.$nextTick(() => {
        const dialogBox = document.querySelectorAll('.table-item span')
        dialogBox.forEach((item) => {
          item.onclick = (event) => {
            const query = {
              baike: item.innerText,
              id: item.getAttribute('data')
            }
            pdAjax({ vm: this }, apiSearch.kgSearch_baike, { params: query }).then((data) => {
              this.dialogData = data.data
              this.dialogVisible = true
              this.$set(this.styleObj, 'left', event.pageX + 'px')
              this.$set(this.styleObj, 'top', event.pageY + 'px')
            })
          }
        })
      })
    },

    handleClose (done) {
      // this.$set(this.styleObj, 'display', 'none')
      done()
    }
  }

}
</script>

<style scoped lang="scss">
.table-content {
  width: 100%;
  padding: 24px;
  box-sizing: border-box;

  ::v-deep .el-dialog {
    margin: 0 !important;
    background: #e5f0f0;

    .el-dialog__header {
      padding: 10px 20px;
    }

    .el-dialog__title {
      font-size: 16px;
      color: $primary;
    }

    .el-dialog__body {
      padding: 0 25px 25px;

      span {
        font-size: 14px;
        color: $primary-font5;
      }
    }
  }

  table {
    width: 100%;

    tr {
      border-color: $primary-line;
      height: 40px;

      td {
        height: 40px;
        padding: 0 20px;

        &:nth-child(odd) {
          width: 200px;
          background: $primary-btn-bg;
          text-align: center;
          color: $primary;
        }
      }
    }

    .table-item {
      font-size: 14px;
      line-height: 18px;
      color: rgba(0, 0, 0, 0.85);
      display: inline-block;
      padding: 12px 0;

      ::v-deep span {
        cursor: pointer;
        margin: 0 2px;
      }
    }

    .table-left {
      font-size: 14px;
      text-align: right !important;
    }
  }

}
</style>
