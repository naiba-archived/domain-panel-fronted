<template>
  <el-row class="login">
    <el-col :sm="{span:12,offset:6}">
      <el-tabs type="border-card">
        <el-tab-pane label="用户登录">
          <el-form :status-icon="true" ref="loginForm" :rules="loginRule" :model="form" label-width="80px">
            <el-form-item label="邮箱" prop="mail">
              <el-input type="email" v-model="form.mail"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="recaptcha">
              <vue-recaptcha @verify="loginGHandler" sitekey="6LfQlWsUAAAAABvm5rFgCpmqGJJitynKiF_fePXR">
              </vue-recaptcha>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit">登录站点</el-button>
              <el-button @click="toReg">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册账号">
          <el-form ref="regForm" :model="form" label-width="80px">
            <el-form-item label="邮箱" prop="mail">
              <el-input placeholder="请输入内容" v-model="form.mail">
                <el-button slot="append" icon="el-icon-info">发送验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="form.verify"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.mail"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="form.repassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="找回密码">
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  data() {
    return {
      form: {
        mail: "",
        password: "",
        recaptcha: "",
        verify: "",
        repassword: ""
      },
      loginRule: {
        mail: [
          { required: true, message: "请输入您的邮箱" },
          { type: "email", message: "邮箱格式不规范" }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符" }
        ],
        recaptcha: [{ required: true, message: "请完成机器人验证" }]
      }
    };
  },
  methods: {
    loginGHandler(resp) {
      this.loginForm.recaptcha = resp;
    },
    toReg() {
      document.getElementById("tab-1").click();
    },
    loginSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  padding: 20px 0px 20px 0px;
}
</style>
