<template>
  <el-row class="login">
    <el-dialog title="人机身份验证" :show-close="false" :visible.sync="recaptchaVisible">
      <vue-recaptcha ref="verifyCaptcha" @verify="verifyGHandler" sitekey="6LfQlWsUAAAAABvm5rFgCpmqGJJitynKiF_fePXR">
      </vue-recaptcha>
    </el-dialog>
    <el-col :sm="{span:12,offset:6}">
      <el-tabs type="border-card">
        <el-tab-pane label="用户登录">
          <el-form :status-icon="true" ref="loginForm" :rules="loginRule" :model="form" label-width="80px">
            <el-form-item label="邮箱" prop="mail">
              <el-input type="email" v-model="form.mail" placeholder="webmaster@nic.com"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="recaptcha">
              <vue-recaptcha ref="loginCaptcha" @verify="loginGHandler" sitekey="6LfQlWsUAAAAABvm5rFgCpmqGJJitynKiF_fePXR">
              </vue-recaptcha>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('loginForm')">登录站点</el-button>
              <el-button @click="toReg">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册账号">
          <el-form ref="regForm" :rules="regRule" :model="form" label-width="80px">
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model="form.mail" placeholder="webmaster@nic.com">
                <el-button @click="sendVerify('reg')" slot="append" icon="el-icon-info">发送验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verify">
              <el-input v-model="form.verify" placeholder="可能在垃圾箱哦"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name" placeholder="润措域名资产管理"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
              <el-input type="password" v-model="form.repassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit('regForm')" type="primary">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="找回密码">
          <el-form ref="resetForm" :rules="resetRule" :model="form" label-width="80px">
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model="form.mail" placeholder="webmaster@nic.com">
                <el-button @click="sendVerify('forget')" slot="append" icon="el-icon-info">发送验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verify">
              <el-input v-model="form.verify" placeholder="可能在垃圾箱哦"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
              <el-input type="password" v-model="form.repassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit('resetForm')" type="primary">重设密码</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  components: { VueRecaptcha },
  mounted() {},
  data() {
    var confimPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      recaptchaVisible: false,
      form: {
        type: "",
        mail: "",
        password: "",
        recaptcha: "",
        verify: "",
        repassword: "",
        name: ""
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
      },
      regRule: {
        mail: [
          { required: true, message: "请输入您的邮箱" },
          { type: "email", message: "邮箱格式不规范" }
        ],
        verify: [
          { required: true, message: "请输入邮箱验证码" },
          { type: "string", len: 5, message: "验证码不正确" }
        ],
        name: [
          { required: true, message: "请输入昵称" },
          { type: "string", min: 2, max: 12, message: "昵称长度介于 2 到 12" }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符" }
        ],
        repassword: [{ validator: confimPass, required: true, trigger: "blur" }]
      },
      resetRule: {
        mail: [
          { required: true, message: "请输入您的邮箱" },
          { type: "email", message: "邮箱格式不规范" }
        ],
        verify: [
          { required: true, message: "请输入邮箱验证码" },
          { type: "string", len: 5, message: "验证码不正确" }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符" }
        ],
        repassword: [{ validator: confimPass, required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    sendVerify(what) {
      if (this.form.mail.length < 6) {
        this.$message.warning("请填写正确的邮箱");
        return;
      }
      this.form.type = what;
      this.recaptchaVisible = true;
    },
    loginGHandler(resp) {
      this.form.recaptcha = resp;
    },
    verifyGHandler(resp) {
      const loading = this.$loading({
        lock: true,
        text: "正在发送验证码",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)"
      });
      this.form.recaptcha = resp;
      this.recaptchaVisible = false;
      this.$refs.verifyCaptcha.reset();
      const nb = this;
      this.$http
        .post("/send_verify", this.form)
        .then(function(response) {
          nb.$message.success("验证码发送成功！");
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          loading.close();
        });
    },
    toReg() {
      document.getElementById("tab-1").click();
    },
    onSubmit(what) {
      var uri = "";
      var msg = "";
      switch (what) {
        case "regForm":
          uri = "reg";
          msg = "注册";
          break;

        case "loginForm":
          uri = "login";
          msg = "登录";
          break;

        case "resetForm":
          uri = "reset_password";
          msg = "重设密码";
          break;

        default:
          this.$message.error("不支持的请求。");
          return;
          break;
      }

      const nb = this;
      this.$refs[what].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在" + msg,
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.7)"
          });
          nb.$http
            .post(uri, nb.form)
            .then(function(response) {
              nb.$message.success(msg + "成功！");
              nb.$store.commit("SET_USER", response.data);
              nb.$router.push("/");
            })
            .catch(function(error) {
              console.log(error);
            })
            .then(function() {
              loading.close();
              if (what == "loginForm") {
                nb.form.recaptcha = "";
                if (nb.$refs.loginCaptcha) {
                  nb.$refs.loginCaptcha.reset();
                }
              }
            });
        } else {
          this.$message.info("请您检查输入重新提交。");
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
