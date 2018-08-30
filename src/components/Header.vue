<template>
    <el-header class="header">
        <el-row>
            <el-col :sm="{span:20,offset:2}">
                <el-row>
                    <el-col :span="18">
                        <img @click="home" height="48px" src="../../static/images/logo.png">
                    </el-col>
                    <el-col :span="6" class="navbar-right">
                        <el-button @click="login" type="primary" plain icon="el-icon-edit-outline">登录</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push("/login");
    },
    home() {
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
</style>