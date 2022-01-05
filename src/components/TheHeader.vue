<template>
  <div class="header-container">
    <div class="header-left" @click="goHome">
      <span>NARI</span>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="menu-container"
      background-color="#fff"
      mode="horizontal"
      text-color="rgba(0, 0, 0, 0.45)"
      @select="handleSelect">
      <el-menu-item v-for="(item,i) in menuList" :key="i" :index="item.router">{{ item.name }}
      </el-menu-item>
      <slot/>
      <div class="user">
        <el-dropdown style="margin-right: 48px;">
                  <span class="el-dropdown-link">
<!--                      <i class="el-icon-bell" :style="{color:$route.name==='home'?'#fff':'#909399'}"></i>-->
                  </span>
          <el-dropdown-menu slot="dropdown" class="menu-dropdown-list">
            <el-dropdown-item
              v-for="item in userDetail"
              :key="item"
              :class="{active : activeMenu===item}"
              :command="item"
              :icon="item"
            >{{ item }}
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown @command="handleCommand">
          <div class="user-info" style="color:rgba(0, 0, 0, 0.45)">
                    <span>
                      {{ name }}
                    </span>
            <el-avatar size="small" :src="circleUrl"></el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown" class="menu-dropdown-list">
            <el-dropdown-item
              v-for="item in userDetail2"
              :key="item"
              :class="{active : activeMenu===item}"
              :command="item"
              :icon="item"
            >{{ item }}
            </el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>

</template>

<script>
import ComponentMixins from '@/mixins/component-mixin'

export default {
  mixins: [ComponentMixins],
  name: 'TheHeader',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      userDetail: ['待查看消息'],
      userDetail2: ['退出'],
      menuList: [
        {
          name: '首页',
          router: 'searchResult'
        },
        {
          name: '文献',
          router: ''
        },
        {
          name: '标准',
          router: ''
        },
        {
          name: '成果',
          router: ''
        },
        {
          name: '专利',
          router: ''
        }],
      activeMenu: '',
      activeIndex: '0'
    }
  },
  props: {
    name: {
      type: String,
      default: '用户名'
    }
  },
  methods: {
    handleCommand (command) {
      if (command === '退出') {
        this.$router.push({ name: 'login' })
      } else {
        this.activeMenu = command
      }
    },

    handleSelect (key) {
      this.$router.push({ name: key })
    },

    goHome () {
      this.$router.push({ name: 'searchResult' })
    }
  }
}
</script>

<style scoped lang="scss">
.header-container {
  display: flex;
  align-items: center;
  /*padding: 10px 32px 0;*/
  width: 100%;
  height: 60px;
  line-height: 58px;
  font-weight: bold;
  /*background: #1C1C24;*/
  .header-left {
    cursor: pointer;
    width: 302px;
    text-align: center;
    line-height: 60px;
    background: $primary-bg-white;
    font-size: 30px;
    font-weight: bold;
    height: 100%;
    flex-shrink: 0;
    color: $primary-font2;
  }

  .menu-container {
    width: calc(100% - 302px);
    border-bottom: none;

    .el-menu-item, ::v-deep .el-submenu__title {
    }

    .el-menu-item {
      min-width: 100px;
      text-align: center;
      border: none;

      &:hover, &.is-active {
        color: $primary-font2 !important;
        background: $primary-btn-bg !important;
      }
    }

  }

  .user {
    float: right;
    display: flex;
    align-items: center;

    .user-info {
      color: white;
      display: flex;
      align-items: center;
      font-size: 14px;
    }

    .el-dropdown {

      .el-dropdown-link {
        color: white;
        display: block;
        height: 100%;
      }

      i {
        font-size: 18px;
        line-height: unset;
      }
    }

    .user-info {
      > span {
        flex-shrink: 0;
      }
    }

    .el-avatar {
      width: 24px;
      height: 24px;
      margin: 0 20px 0 12px;
    }
  }

}
</style>
