<template>
  <el-row>
    <el-col :sm="{span:20,offset:2}" style="padding:20px">
      <el-alert :title="'会员服务到期日期：'+user.Expire" type="error" :closable="false"></el-alert>
    </el-col>
  </el-row>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
