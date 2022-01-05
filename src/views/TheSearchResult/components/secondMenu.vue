<template>
  <div class="second-menu">
        <span class="link"
              :class="{active:$route.params.page === item.url}"
              @click="goPage(item.url)"
              :underline="false"
              v-for="(item,i) in tabs"
              :key="i">
            {{ item.title }}
        </span>
  </div>
</template>

<script>

export default {
  name: 'SecondMenu',
  components: {},
  data () {
    return {
      tabs: [
        {
          url: '0',
          title: '专利'
        },
        {
          url: '1',
          title: '文献论文'
        },
        {
          url: '2',
          title: '市场报告'
        },
        {
          url: '3',
          title: '法规'
        },
        {
          url: '4',
          title: '新闻'
        },
        {
          url: '5',
          title: '标准'
        },
        {
          url: '6',
          title: '公众号'
        },
        {
          url: '7',
          title: '内部文件'
        }
      ]
    }
  },
  methods: {
    goPage (name) {
      this.$router.push({
        name: 'searchResult',
        params: { page: name },
        query: this.$route.query
      })
    }
  }

}
</script>

<style scoped lang="scss">
.second-menu {
  width: 100%;
  height: 34px;
  background: white;
  box-shadow: 0 1px 7px rgba(0, 0, 0, .2);
  display: flex;
  align-items: center;
  justify-content: center;

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
