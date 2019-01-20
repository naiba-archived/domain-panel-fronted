<template>
  <el-row class="header">
    <el-col :sm="{span:20,offset:2}">
      <el-row>
        <el-col :span="15">
          <img
            @click="goto('/')"
            height="48px"
            src="https://www.riluo.cn/static/offical/images/logo.png"
          >
        </el-col>
        <el-col
          :span="8"
          class="navbar-right"
        >
          <el-button
            v-if="!user"
            @click="oauth2Login()"
            type="primary"
            plain
            icon="el-icon-edit-outline"
          >登录</el-button>
          <el-dropdown
            v-if="user"
            split-button
            @click="goto('/dashboard')"
            type="text"
          >
            <span>
              <img
                width="25px"
                style="margin-bottom:-4px"
                :src="'https://tv.sb/upload/avatar/'+user.UcenterID"
              > {{user.UcenterExtra?user.UcenterExtra:"未命名"}}
            </span>
            <el-dropdown-menu
              slot="dropdown"
              class="panel-list"
            >
              <el-dropdown-item>
                <el-button
                  @click="goto('/dashboard/new-panel')"
                  size="mini"
                  type="text"
                  icon="el-icon-circle-plus-outline"
                >新建米表</el-button>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="Object.keys(panels).length > 0"
                :divided="true"
              ></el-dropdown-item>
              <el-dropdown-item
                v-if="Object.keys(panels).length > 0"
                v-for="panel in panels"
              >
                <el-button
                  @click="goto('/panel/'+panel.ID+'/')"
                  size="mini"
                  type="text"
                  icon="el-icon-document"
                >{{panel.Domain}}</el-button>
              </el-dropdown-item>
              <el-dropdown-item
                v-if="Object.keys(panels).length > 0"
                :divided="true"
              ></el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-setting"
                  @click="goto('/dashboard/settings')"
                >个人设置</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button
                  size="mini"
                  type="text"
                  @click="logout"
                  icon="el-icon-remove-outline"
                >退出登录</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    panels() {
      return this.$store.state.panels;
    }
  },
  methods: {
    oauth2Login() {
      window.location.href = "http://localhost:8080/hack/oauth2-login";
    },
    goto(dist) {
      this.$router.push(dist);
    },
    logout() {
      this.$store.clear;
      this.$store.commit("CLEAR");
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  padding-top: 5.5px;
  padding-bottom: 5.5px;
  border-bottom: solid #eee 1px;
  .el-col {
    height: 100%;
  }
}
.navbar-right {
  line-height: 48px;
  text-align: right;
}
.panel-list {
  button {
    width: 100%;
    text-align: left;
    // 超出一行省略
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  button.el-button--mini.is-circle {
    padding: 3px;
    margin: 0px;
  }
}
</style>