<template>
  <div class="demo">
      <button v-on:click="start">{{switchName}}</button>
    <p>水平无限滚动列表</p>
    <v-infinite-scroll :isStart="isStart">
      <template #up="{ up }">
        <div class="col" v-for="(col, index) in up">{{col}}</div>
      </template>
      <template #down="{ down }">
        <div class="col" v-for="(col, index) in down">{{col}}</div>
      </template>
    </v-infinite-scroll>
  </div>
</template>
<script>
import VInfiniteScroll from '../../packages/src/index';
export default {
  data () {
      return {
        isStart: true
      }
  },
  computed: {
    switchName () {
      return this.isStart ? '停止' : '开始'
    }
  },
  methods: {
    start () {
      this.isStart = !this.isStart
    }
  },
  components: {
    VInfiniteScroll
  }

};


</script>
<style lang="less" scopped>
 
</style>