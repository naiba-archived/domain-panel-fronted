<template>
  <el-row>
    <el-col :sm="{span:20,offset:2}" style="padding:20px">
      <el-tabs :value="activeTab" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="域名列表" name="list">
          <el-table :stripe="true" :data="domains" :default-sort="{prop: 'cat', order: 'descending'}">
            <el-table-column label="#" width="180">
              <template slot-scope="scope">
                {{ scope.row.ID }}
              </template>
            </el-table-column>
            <el-table-column label="域名" width="180">
              <template slot-scope="scope">
                {{ scope.row.Domain }}
              </template>
            </el-table-column>
            <el-table-column label="分类" width="180" :filters="catsTags" :filter-method="filterTag" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.$index % 2 == 0 ? 'primary' : 'success'" disable-transitions>{{cat(scope.row.CatID,'Name')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="简介" width="180">
              <template slot-scope="scope">
                {{ scope.row.Desc }}
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
        <el-tab-pane :label="form.ID?'修改域名':'添加域名'" name="edit">
          <el-form :status-icon="true" ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="域名" prop="Domain">
              <el-input v-model="form.Domain" placeholder="RiLuo.cn"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="Desc">
              <el-input v-model="form.Desc" placeholder="日落资产管理"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="CatID">
              <el-select v-model="form.CatID" placeholder="请选择">
                <el-option v-for="item in cats" :key="item.ID" :label="item.Name" :value="item.ID">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-alert title="请将米表域名cname到 parking.riluo.cn." type="success" :closable="false">
              </el-alert>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit" type="primary">{{form.ID?"修改":"添加"}}</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var confimDomain = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入域名"));
      } else if (!value.match(/^[a-zA-Z0-9-]{1,61}(?:\.[a-zA-Z]{2,})+$/g)) {
        callback(new Error("域名格式不规范"));
      } else {
        callback();
      }
    };
    return {
      activeTab: "list",
      form: {
        PanelID: parseInt(this.$route.params.id),
        CatID: null,
        ID: 0,
        Domain: "",
        Desc: ""
      },
      cats: [],
      catsTags: [],
      domains: [],
      rules: {
        Domain: [{ validator: confimDomain, required: true }],
        Desc: [
          { required: true, message: "请输入域名简介", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        CatID: [
          { required: true, message: "请选择分类", trigger: "blur" },
          {
            type: "number",
            min: 1,
            message: "请选择列表中的分类",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    const nb = this;
    axios
      .all([
        this.$http.get("panel/" + this.$route.params.id + "/domains"),
        this.$http.get("panel/" + this.$route.params.id + "/cats")
      ])
      .then(
        axios.spread((domainRes, catRes) => {
          nb.cats = catRes.data;
          nb.cats.forEach(cat => {
            nb.catsTags.push({
              text: cat.Name,
              value: cat.ID
            });
          });
          nb.domains = domainRes.data;
        })
      );
  },
  methods: {
    filterTag(value, row) {
      return row.CatID === value;
    },
    cat(catID, prop) {
      var c = this.cats.find(function(val, ind) {
        return val.ID == catID;
      });
      if (c) {
        return c[prop];
      }
      return undefined;
    },
    handleTabClick(tab, event) {
      this.activeTab = tab.name;
      if (tab.name != "edit") {
        this.$refs.form.resetFields();
        this.form.ID = 0;
      }
    },
    handleDelete(index, row) {
      const nb = this;
      this.$confirm("确定删除域名？").then(() => {
        this.$http.delete("domain/" + row.ID).then(function() {
          var index = 0;
          var domain = nb.domains.find(function(val, ind) {
            index = ind;
            return val.ID == row.ID;
          });
          if (domain) {
            nb.domains.splice(index, 1);
          }
          nb.$message("删除成功");
        });
      });
    },
    handleEdit(index, row) {
      this.form.ID = row.ID;
      this.form.Domain = row.Domain;
      this.form.Desc = row.Desc;
      this.form.CatID = row.CatID;
      this.activeTab = "edit";
    },
    reset() {
      this.$refs.form.resetFields();
    },
    onSubmit() {
      const nb = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          var what = this.form.ID ? "修改域名" : "添加域名";
          const loading = this.$loading({
            lock: true,
            text: "正在" + what,
            spinner: "el-icon-loading",
            background: "rgba(255, 255, 255, 0.7)"
          });
          (this.form.ID
            ? this.$http.put("domain", this.form)
            : this.$http.post("domain", this.form)
          )
            .then(function(response) {
              nb.$message.success(what + "成功！");
              if (nb.form.ID) {
                var index = 0;
                var domain = nb.domains.find(function(val, ind) {
                  index = ind;
                  return val.ID == response.data.ID;
                });
                if (domain) {
                  nb.domains.splice(index, 1, response.data);
                }
              } else {
                nb.domains.push(response.data);
              }
              nb.form.ID = 0;
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
