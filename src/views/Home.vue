<template>
  <div class="demo">
    <div class="demo-section">
      <horizontal></horizontal>
    </div>
    <div class="demp-section">
      <vertical></vertical>
    </div>
  </div>
</template>
<script>
import Horizontal from "./horizontal";
import Vertical from "./vertical";
export default {
  components: {
    Horizontal,
    Vertical
  }
};
</script>
<style lang="less" scopped>
.demo {

  .demo-section {
    
    padding: 10px;
  }
}
</style>