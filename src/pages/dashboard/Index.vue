<template>
  <el-row>
    <el-col :sm="{span:20,offset:2}" :xl="{span:8,offset:8}" style="padding:20px">
      <p>黄金会员到期：{{user.GoldVIPExpire}}
        <el-button size="mini" type="success" plain @click="pay('gold')">续费会员</el-button>
      </p>
      <p>超级会员到期：{{user.SuperVIPExpire}}
        <el-button size="mini" type="success" plain @click="pay('super')">续费会员</el-button>
      </p>
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
    pay(what) {
      window.open("/api/pay?vip=" + what+"&Authorization="+this.user.Token);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
