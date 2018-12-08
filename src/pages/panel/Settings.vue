<template>
  <el-row style="padding-top:20px">
    <el-col :sm="{span:20,offset:2}">
      <panel-form :is-edit="true" :panel="currentPanel"></panel-form>
    </el-col>
  </el-row>
</template>

<script>
import PanelForm from "../../components/PanelForm.vue";
export default {
  components: { PanelForm },
  computed: {
    currentPanel() {
      return this.$store.state.panels[this.$route.params.id];
    }
  }
};
</script>

<style lang="less" scoped>
</style>
