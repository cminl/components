<template>
  <div class="result-left">
    <div class="item" style="height: 100%;">
      <TheBoxContainer title="热点排行">
        <div slot="content" class="right-content">
          <div v-for="o in 10" :key="o" class="text" :class="{redColor:o<4}">
            <span> {{ o }} </span>{{ '热点内容 ' }}
          </div>
        </div>
      </TheBoxContainer>
    </div>
  </div>
</template>

<script>
import TheBoxContainer from '@/components/TheBoxContainer.vue'

export default {
  name: 'ResultRight',
  components: {
    TheBoxContainer
  }
}
</script>

<style scoped lang="scss">
.result-left {
  width: 100%;
  height: 100%;

  .right-content {
    padding: 8px 0;
  }

  .text {
    text-align: left;
    color: #909399;
    /*line-height: 34px;*/
    font-size: 14px;
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      background: #F2F6FC;
    }

    > span {
      font-weight: bold;
      margin-right: 16px;
    }

    &.redColor {
      span {
        color: #E94820;
      }
    }
  }
}
</style>
