<template>
  <el-row>
    <el-col :sm="{span:20,offset:2}" style="padding:20px">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="昵称" prop="Name">
          <el-input v-model="form.Name" placeholder="日落"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="Phone">
          <el-input v-model="form.Phone" placeholder="18888888888"></el-input>
        </el-form-item>
        <el-form-item label="Q Q" prop="QQ">
          <el-input v-model="form.QQ" placeholder="2088888812"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="Weixin">
          <el-input v-model="form.Weixin" placeholder="weixin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Name: this.$store.state.user.Name,
        Phone: this.$store.state.user.Phone,
        QQ: this.$store.state.user.QQ,
        Weixin: this.$store.state.user.Weixin
      },
      rules: {
        Name: [
          { required: true, message: "请填写昵称", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 至 12 之间",
            trigger: "blur"
          }
        ],
        Phone: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 至 20 之间",
            trigger: "blur"
          }
        ],
        Weixin: [
          { required: true, message: "请填写微信号", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 至 20 之间",
            trigger: "blur"
          }
        ],
        QQ: [
          { required: true, message: "请填写QQ号码", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 至 20 之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      const nb = this;
      const msg = "保存";
      this.$refs.form.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在" + msg,
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.7)"
          });
          this.$http
            .put("user", this.form)
            .then(function(response) {
              nb.$message.success(msg + "成功！");
              nb.$store.commit("SET_USER", response.data);
            })
            .catch(function(error) {
              console.log(error);
            })
            .then(function() {
              loading.close();
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
</style>
