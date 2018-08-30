<template>
  <div>
    <el-carousel class="main">
      <el-carousel-item v-for="item in carousel_text" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-main>
      <el-row :gutter="10">
        <el-col :sm="{span:8,offset:4}">
          <el-card class="plan-card" shadow="hover" header="月付计划">
            <p>一个真正的投资者并不会如赌博般随意投放资金，他只会投放于有足够可能性获取利润的工具上。</p>
            <div class="price">￥
              <span class="value">10</span>
              <span>每月</span>
            </div>
            <div class="promotion">
              <span class="money">￥120</span>
              <span class="discount">年付优惠</span>
            </div>
            <p @click="payInfoVisible = true" class="button">马上开始</p>
          </el-card>
        </el-col>
        <el-col :sm="8">
          <el-card class="plan-card plan-gold" shadow="hover" header="年付计划">
            <p>人们习惯把每天短线进出股市的投机客称之为投资人，就好像大家把不断发生一夜情的爱情骗子当成浪漫情人一样。</p>
            <div class="price">￥
              <span class="value">98</span>
              <span>每年</span>
            </div>
            <div class="promotion">
              <span class="money">￥120</span>
              <span class="discount">年付优惠</span>
            </div>
            <p @click="payInfoVisible = true" class="button">马上开始</p>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog title="支付宝扫码付款" :visible.sync="payInfoVisible">
      <div class="payinfo">
        <strong>转账备注填写注册邮箱</strong>
        <br>
        <img width="100%" src="../../static/images/pay.png">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="payInfoVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Pay } from "../components/Pay.vue";

export default {
  components: { Pay },
  data: () => {
    return {
      payInfoVisible: false,
      carousel_text: ["专业域名停放", "省心资产管理", "高端投资交流"]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.main {
  background-color: #f6f9fc;
  text-align: center;
  .el-carousel__item {
    line-height: 300px;
    h3 {
      font-size: 100px;
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
    }
  }
}
.payinfo {
  text-align: center;
  strong {
    font-size: 20px;
    color: red;
  }
  img {
    width: 50%;
  }
}
</style>