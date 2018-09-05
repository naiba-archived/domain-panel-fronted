<template>
  <el-row>
    <el-col :sm="{span:20,offset:2}" style="padding:20px">
      <el-tabs :value="activeTab" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="分类列表" name="list">
          <el-table :stripe="true" :data="cats" :default-sort="{prop: 'index', order: 'descending'}">
            <el-table-column label="#" width="180">
              <template slot-scope="scope">
                {{ scope.row.ID }}
              </template>
            </el-table-column>
            <el-table-column label="中文名" width="180">
              <template slot-scope="scope">
                {{ scope.row.Name }}
              </template>
            </el-table-column>
            <el-table-column label="英文名" width="180">
              <template slot-scope="scope">
                {{ scope.row.NameEn }}
              </template>
            </el-table-column>
            <el-table-column label="排序" width="180" prop="index" sortable>
              <template slot-scope="scope">
                {{ scope.row.Index }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="form.id?'修改分类':'添加分类'" name="edit">
          <el-form :status-icon="true" ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="中文名" prop="name">
              <el-input v-model="form.name" placeholder="单字符"></el-input>
            </el-form-item>
            <el-form-item label="英文名" prop="name_en">
              <el-input v-model="form.name_en" placeholder="Single-Char"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="index">
              <el-input-number :min="0" v-model="form.index" :step="5"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit" type="primary">{{form.id?"修改":"添加"}}</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "list",
      form: {
        pid: parseInt(this.$route.params.id),
        id: 0,
        name: "",
        name_en: "",
        index: 0
      },
      cats: [],
      rules: {
        name: [
          { required: true, message: "请输入中文分类名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        name_en: [
          { required: true, message: "请输入英文分类名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    const nb = this;
    this.$http.get("panel/" + this.$route.params.id + "/cats").then(resp => {
      nb.cats = resp.data;
    });
  },
  methods: {
    handleTabClick(tab, event) {
      this.activeTab = tab.name;
      if (tab.name != "edit") {
        this.$refs.form.resetFields();
        this.form.id = 0;
      }
    },
    handleDelete(index, row) {
      const nb = this;
      this.$confirm("确定删除分类？（将会删除下属的域名）").then(() => {
        this.$http.delete("cat/" + row.ID).then(function() {
          var index = 0;
          var cat = nb.cats.find(function(val, ind) {
            index = ind;
            return val.ID == row.ID;
          });
          if (cat) {
            nb.cats.splice(index, 1);
          }
          nb.$message("删除成功");
        });
      });
    },
    handleEdit(index, row) {
      this.form.id = row.ID;
      this.form.index = row.Index;
      this.form.name = row.Name;
      this.form.name_en = row.NameEn;
      this.activeTab = "edit";
    },
    reset() {
      this.$refs.form.resetFields();
    },
    onSubmit() {
      const nb = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          var what = this.form.id ? "修改分类" : "添加分类";
          const loading = this.$loading({
            lock: true,
            text: "正在" + what,
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.7)"
          });
          (this.form.id
            ? this.$http.put("cat", this.form)
            : this.$http.post("cat", this.form)
          )
            .then(function(response) {
              nb.$message.success(what + "成功！");
              if (nb.form.id) {
                var index = 0;
                var cat = nb.cats.find(function(val, ind) {
                  index = ind;
                  return val.ID == response.data.ID;
                });
                if (cat) {
                  nb.cats.splice(index, 1, response.data);
                }
              } else {
                nb.cats.push(response.data);
              }
              nb.form.id = 0;
              nb.$refs.form.resetFields();
              nb.activeTab = "list";
            })
            .catch(function(error) {
              console.log(error);
            })
            .then(function() {
              loading.close();
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
