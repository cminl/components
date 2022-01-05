<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'TheChart',
  data () {
    return {
      chart: null
    }
  },
  props: {
    options: {}
  },
  mounted () {
    this.$nextTick(() => {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.options)
      this.chart.on('click', (params) => {
        this.$emit('chartClick', params)
      })
      this.$watch('options', options => {
        this.chart.setOption(options, true)
      }, { deep: true })
    })
  }
}

</script>
<style lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
