<template>
    <div>
        <el-row class="section" style="padding-top:0px;padding-bottom:0px">
            <el-col :sm="{span:20,offset:2}">
                <el-menu text-color="#444" :default-active="menuActiveIndex" background-color="#fff0" mode="horizontal" style="border:none" @select="handleSelect">
                    <el-menu-item index="/dashboard">管理面板</el-menu-item>
                    <el-menu-item index="/dashboard/offers">报价列表</el-menu-item>
                    <el-menu-item index="/dashboard/new-panel">新建米表</el-menu-item>
                    <el-menu-item index="/dashboard/settings">个人设置</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menuActiveIndex: ""
    };
  },
  watch: {
    $route(to) {
      this.menuActiveIndex = this.$route.path;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    }
  },
  mounted() {
    this.menuActiveIndex = this.$route.path;
  }
};
</script>

<style lang="less" scoped>
</style>
