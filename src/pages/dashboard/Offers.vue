<template>
  <el-row>
    <el-col :sm="{span:20,offset:2}" :xl="{span:8,offset:8}" style="padding:20px">
      <el-tabs value="list" type="border-card">
        <el-tab-pane label="报价列表" name="list">
          <el-table :stripe="true" :data="offers" :default-sort="{prop: 'CreatedAt', order: 'descending'}">
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
            <el-table-column label="报价">
              <template slot-scope="scope">
                {{ scope.row.Currency}}{{ scope.row.Amount}}
              </template>
            </el-table-column>
            <el-table-column label="姓名">
              <template slot-scope="scope">
                {{ scope.row.Name}}
              </template>
            </el-table-column>
            <el-table-column label="邮箱">
              <template slot-scope="scope">
                {{ scope.row.Mail}}
              </template>
            </el-table-column>
            <el-table-column label="报价时间" prop="CreatedAt" sortable>
              <template slot-scope="scope">
                {{ scope.row.CreatedAt }}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      offers: []
    };
  },
  mounted() {
    const nb = this;
    axios.all([this.$http.get("offers")]).then(
      axios.spread(offersRes => {
        nb.offers = offersRes.data;
      })
    );
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
