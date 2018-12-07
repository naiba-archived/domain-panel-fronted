<template>
  <el-row style="padding-top:20px">
    <el-col :sm="{span:20,offset:2}" :xl="{span:8,offset:8}">
      <panel-form></panel-form>
    </el-col>
  </el-row>
</template>

<script>
import PanelForm from "../../components/PanelForm.vue";
export default {
  components: { PanelForm },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
