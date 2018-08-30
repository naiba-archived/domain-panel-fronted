<template>
  <el-row class="header">
    <el-col :sm="{span:20,offset:2}">
      <el-row>
        <el-col :span="15">
          <img @click="home" height="48px" src="../../static/images/logo.png">
        </el-col>
        <el-col :span="8" class="navbar-right">
          <el-button v-if="!user" @click="login" type="primary" plain icon="el-icon-edit-outline">登录</el-button>
          <el-dropdown v-if="user">
            <span class="el-dropdown-link">
              <img width="25px" style="margin-bottom:-4px" :src="'https://robohash.org/'+user.Mail+'.png?set=set2'"> {{user.Name?user.Name:"未设置"}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="logout" icon="el-icon-remove">退出登录</el-button>
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
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    home() {
      this.$router.push("/");
    },
    logout() {
      this.$store.commit("REMOVE_USER");
      this.$router.push("/login");
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
</style>