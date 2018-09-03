<template>
  <div>
    <el-row class="section" style="padding-top:0px;padding-bottom:0px">
      <el-col :sm="{span:20,offset:2}">
        <el-menu text-color="#444" :default-active="menuActiveIndex" background-color="#fff0" mode="horizontal" style="border:none" @select="handleSelect">
          <el-menu-item index="logo" disabled>
            <img style="max-width:192px;max-height:48px" :src="'http://localhost:8080/upload/logo/'+currentPanel.ID+'-logo.png'">
          </el-menu-item>
          <el-menu-item index="/">域名管理</el-menu-item>
          <el-menu-item index="/cats">分类管理</el-menu-item>
          <el-menu-item index="/settings">米表设置</el-menu-item>
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
  computed: {
    currentPanel() {
      return this.$store.state.panels[this.$route.params.id];
    }
  },
  watch: {
    $route() {
      document.title =
        this.$store.state.panels[this.$route.params.id].Name +
        " " +
        document.title;
      if (this.$route.path.endsWith("/settings")) {
        this.menuActiveIndex = "/settings";
      } else {
        this.menuActiveIndex = "/";
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push("/panel/" + this.$route.params.id + key);
    }
  },
  mounted() {
    document.title =
      this.$store.state.panels[this.$route.params.id].Name +
      " " +
      document.title;
    if (this.$route.path.endsWith("/settings")) {
      this.menuActiveIndex = "/settings";
    } else {
      this.menuActiveIndex = "/";
    }
  }
};
</script>

<style lang="less" scoped>
</style>
