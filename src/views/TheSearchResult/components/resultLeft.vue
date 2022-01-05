<template>
  <div class="result-left">
    <div class="item" v-for="(aggregation,aggIndex) in dataList" :key="aggIndex+'name'">
      <TheBoxContainer :title="aggregation.d">
        <div slot="content" class="first-item">
          <el-menu class="el-menu-vertical" :collapse="true"
                   @select="handleSelect">
            <div v-for="(item,key) of aggregation.v"
                 :key="item.value">
              <el-menu-item :index="JSON.stringify({d:aggregation.d,k:aggregation.k,v:[key]})"
                            :class="{'set-active':isActive===JSON.stringify({d:aggregation.d,k:aggregation.k,v:[key]})}">
                <div>{{ key + '(' + item + ')' }}</div>
              </el-menu-item>
            </div>
          </el-menu>
          <el-button class="show-more" type="text"
                     v-if="aggregation.isMore"
                     @click="toggleShowMore(aggregation.showMore,aggIndex)">
            {{ aggregation.showMore ? '收起' : '展开' }}
          </el-button>
        </div>
      </TheBoxContainer>
    </div>
  </div>

</template>

<script>
import TheBoxContainer from '@/components/TheBoxContainer.vue'
import * as _ from 'lodash'

export default {
  components: {
    TheBoxContainer
  },
  name: 'ResultLeft',
  props: { aggList: {} },
  data () {
    return {
      dataList: [],
      formData: {
        categoryId: '',
        date: ''
      },
      isActive: 0
    }
  },
  watch: {
    'aggList' (v) {
      console.log(v)
      if (this.aggList) {
        this.dataList = _.cloneDeep(this.aggList)
        this.dataList.forEach((item) => {
          this.$set(item, 'showMore', false)
          if (Object.keys(item.v).length > 5) {
            this.$set(item, 'isMore', true)
            this.$set(item, 'v', _.pick(item.v, Object.keys(item.v).slice(0, 5)))
          }
        })
      }
    }
  },
  created () {
  },
  methods: {
    toggleShowMore (type, index) {
      this.$set(this.dataList[index], 'showMore', !type)
      if (type) {
        this.dataList[index].v = _.pick(this.dataList[index].v, Object.keys(this.dataList[index].v).slice(0, 5))
      } else {
        this.dataList[index].v = this.aggList[index].v
      }
    },
    handleSelect (key) {
      this.isActive = key
      this.$emit('aggregationChange', key)
    }
  }
}
</script>
<style lang="scss">
.el-menu--popup {
  padding: 0;
  max-height: 500px;
  overflow-y: auto;

  .el-menu-item {
    height: 36px;
    line-height: 32px;

    &:hover {
      background: #F2F6FC;
    }
  }
}
em {
  color: #E94820;
  font-style: normal;
  margin-left: 4px;
}
</style>
<style scoped lang="scss">
.result-left {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: $primary-bg-white;
  /*滚动条整体样式*/
  &::-webkit-scrollbar {
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  /*滚动条里面小方块*/
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
  }

  /*滚动条里面轨道*/
  &::-webkit-scrollbar-track {
    background: white;
  }
  .item {
    height: auto;

    .first-item {
      overflow: auto;
      padding-bottom: 10px;

      .show-more {
        float: right;
        margin: 0 12px;
        padding-top: 0;
      }

      .el-menu {
        width: 100%;
      }

      .el-menu-item {
        > div {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &.is-active {
          color: $primary-font5;
        }

        &.set-active {
          color: $primary-font;
          background: $primary-btn-bg !important;
        }
      }

      .el-menu-item, .el-submenu {
        height: 36px;
        line-height: 32px;

        &:hover {
          background: #F2F6FC;
        }

        &:focus {
          background: transparent;
        }
      }

      .el-submenu {
        padding: 0;

        .el-icon-arrow-right {
          font-size: 12px;
          font-weight: bold;
        }
      }

      .el-submenu {
        /*position: relative;*/
        ::v-deep .el-submenu__title {
          height: 40px;

          .title {
            height: 40px;
            line-height: 40px;
          }

          &.active {
            background: #F2F6FC;
          }

          &:hover {
            background: #F2F6FC;
          }
        }
      }
    }

    .text {
      font-size: 12px;
      line-height: 12px;
      color: #606266;
      padding: 14px 12px;
      cursor: pointer;

      &:hover {
        background: #F2F6FC;
      }

      &.active {
        color: #E94820;
      }
    }

    .line {
      border-top: 2px solid #E4E7ED;
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
      color: #909399;
      padding: 16px 12px;
    }

    .date-container {
      width: 100%;
      padding: 8px 12px;
      background: #F2F6FC;
    }

    .el-date-editor {
      width: 100%;
    }
  }

  .el-button {
    margin: 16px 12px;
  }
}
</style>
