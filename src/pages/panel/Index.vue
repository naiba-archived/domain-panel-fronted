<template>
  <el-row>
    <el-col :sm="{span:20,offset:2}" style="padding:20px">
      <el-tabs :value="activeTab" type="border-card" @tab-click="handleTabClick">
        <el-tab-pane label="域名列表" name="list">
          <el-table :stripe="true" :data="domains" :default-sort="{prop: 'cat', order: 'descending'}" show-summary>
            <el-table-column label="#">
              <template slot-scope="scope">
                {{ scope.row.ID }}
              </template>
            </el-table-column>
            <el-table-column label="域名">
              <template slot-scope="scope">
                {{ scope.row.Domain }}
              </template>
            </el-table-column>
            <el-table-column label="分类" :filters="catsTags" :filter-method="filterTag" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.$index % 2 == 0 ? 'primary' : 'success'" disable-transitions>{{cat(scope.row.CatID,'Name')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="到期时间" width="180" prop="Expire" sortable>
              <template slot-scope="scope">
                {{ scope.row.Expire }}
              </template>
            </el-table-column>
            <el-table-column label="简介" width="180">
              <template slot-scope="scope">
                {{ scope.row.Desc }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="170">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column label="续费成本" prop="Renew">
              <template slot-scope="scope">
                {{ scope.row.Renew }}
              </template>
            </el-table-column>
            <el-table-column label="购入成本" prop="Cost">
              <template slot-scope="scope">
                {{ scope.row.Cost }}
              </template>
            </el-table-column>
            <el-table-column label="注册商" width="200">
              <template slot-scope="scope">
                {{ scope.row.Registrar }}
              </template>
            </el-table-column>
            <el-table-column label="注册时间" width="180" prop="Create" sortable>
              <template slot-scope="scope">
                {{ scope.row.Create }}
              </template>
            </el-table-column>
            <el-table-column label="购入时间" width="180" prop="Buy" sortable>
              <template slot-scope="scope">
                {{ scope.row.Buy }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="form.ID?'修改域名':'添加域名'" name="edit">
          <el-form :status-icon="true" ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="域名" prop="Domain">
              <el-input @blur="domainFetch" v-model="form.Domain" placeholder="RiLuo.cn"></el-input>
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
            <el-form-item label="购入时间" prop="Buy">
              <el-date-picker v-model="form.Buy" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="购入成本" prop="Cost">
              <el-input-number v-model="form.Cost" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="续费成本" prop="Renew">
              <el-input-number v-model="form.Renew" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="注册平台" prop="Registrar">
              <el-input v-model="form.Registrar" placeholder="Godaddy"></el-input>
            </el-form-item>
            <el-form-item label="注册时间" prop="Create">
              <el-date-picker v-model="form.Create" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间" prop="Expire">
              <el-date-picker v-model="form.Expire" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-alert title="请将所有域名cname到 parking.riluo.cn." type="success" :closable="false">
              </el-alert>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit" type="primary">{{form.ID?"修改":"添加"}}</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane style="padding:10px" label="批量导入" name="batch">
          <el-alert type="success" :closable="false" title="批量导入格式:" style="margin-bottom:15px">
            <template slot-scope="description">
              <p style="font-size:14px">
                #分类中文,分类英文<br> 域名,购入成本（可留空）,续费成本（可留空）,中文简介（可留空）,英文简介（可留空）<br> #单字符,Single Char<br> qq.com,1000000,69,腾讯,Tencent<br> #双拼,Double Pinyin<br> taobao.com,1000000,69,淘宝,Alibaba
              </p>
            </template>
          </el-alert>
          <el-form :status-icon="true" ref="batch" :rules="batchRule" :model="batch">
            <el-form-item prop="domainsText">
              <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 30}" placeholder="" v-model="batch.domainsText">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onBatch" type="primary">导入</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import chrono from "chrono-node";
export default {
  data() {
    let confimDomain = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入域名"));
      } else if (!value.match(/^[a-zA-Z0-9-]{1,61}(?:\.[a-zA-Z]{2,})+$/g)) {
        callback(new Error("域名格式不规范"));
      } else {
        callback();
      }
    };
    let confimBatch = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入要导入的域名"));
      } else {
        var cat = null;
        (this.batchParse = []),
          value.split("\n").forEach((line, i) => {
            if (i == 0 && !line.startsWith("#")) {
              callback("第「" + i + "」行：必须以分类开头");
              return;
            }
            if (line.startsWith("#")) {
              let catObj = line.substring(1).split(",");
              if (catObj.length !== 2) {
                callback("第「" + i + "」行：分类格式错误（#中文,英文）");
                return;
              }
              if (cat) {
                this.batchParse.push(
                  Object.assign({ Name: "", NameEn: "", Domains: [] }, cat)
                );
              }
              cat = { Name: catObj[0], NameEn: catObj[1], Domains: [] };
            } else {
              let domainObj = line.split(",");
              if (domainObj.length !== 5) {
                callback(
                  "第「" +
                    i +
                    "」行：域名格式错误「域名,购入成本（可留空）,续费成本（可留空）,中文简介（可留空）,英文简介（可留空）」"
                );
                return;
              }
              cat.Domains.push({
                Domain: domainObj[0],
                Cost: domainObj[1],
                Renew: domainObj[2],
                Desc: domainObj[3],
                DescEn: domainObj[4]
              });
            }
          });
        this.batchParse.push(cat);
        callback();
      }
    };
    return {
      batch: {
        domainsText: ""
      },
      batchParse: [],
      batchRule: {
        domainsText: [{ validator: confimBatch, required: true }]
      },
      activeTab: "list",
      form: {
        PanelID: parseInt(this.$route.params.id),
        CatID: null,
        ID: 0,
        Domain: "",
        Desc: "",
        Cost: null,
        Renew: null,
        Create: null,
        Expire: null,
        Registrar: ""
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
    domainFetch(e) {
      function ISODateString(d) {
        function pad(n) {
          return n < 10 ? "0" + n : n;
        }
        return (
          d.getUTCFullYear() +
          "-" +
          pad(d.getUTCMonth() + 1) +
          "-" +
          pad(d.getUTCDate()) +
          "T" +
          pad(d.getUTCHours()) +
          ":" +
          pad(d.getUTCMinutes()) +
          ":" +
          pad(d.getUTCSeconds()) +
          "Z"
        );
      }

      if (this.form.Domain.match(/^[a-zA-Z0-9-]{1,61}(?:\.[a-zA-Z]{2,})+$/g)) {
        this.$http.get("whois/" + this.form.Domain).then(resp => {
          if (resp.status == 200) {
            let created = chrono.parseDate(resp.data.registrar.created_date);
            if (created) {
              this.form.Create = ISODateString(created);
            }
            let expired = chrono.parseDate(resp.data.registrar.expiration_date);
            if (expired) {
              this.form.Expire = ISODateString(expired);
            }
            this.form.Registrar = resp.data.registrar.registrar_name;
          }
        });
      }
    },
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
      this.form.Expire = row.Expire;
      this.form.Create = row.Create;
      this.form.Buy = row.Buy;
      this.form.Cost = row.Cost;
      this.form.Renew = row.Renew;
      this.form.Registrar = row.Registrar;
      this.activeTab = "edit";
    },
    reset() {
      this.$refs.form.resetFields();
    },
    onBatch() {
      const nb = this;
      this.$refs.batch.validate(valid => {
        if (valid) {
          console.log(this.batchParse);
          return false;
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
