<template>
  <div class="demo">
    <button v-on:click="start">{{switchName}}</button>
    <p>水平无限滚动列表</p>
    <div class="text-list">
      <v-infinite-scroll direction="horizontal" ref="infinite-scroll" :isStart="isStart" :row="5">
        <template #up="{ up }">
          <div class="col up" v-for="(col, index) in up">{{col}}</div>
        </template>
        <template #down="{ down }">
          <div class="col down" v-for="(col, index) in down">{{col}}</div>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>
<script>
import VInfiniteScroll from "../../packages/src/index";
import axios from "axios";

let rowNum = 6;
async function fetch(count) {
  let data = [];
  console.log("开始获取数据");
  for (let i = 0; i < count; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row[j] = `r-${rowNum}-c-${j}`;
    }
    rowNum++;
    data.push(row);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
      console.log("获取数据为", data);
    }, 1000);
  });
}

export default {
  data() {
    return {
      isStart: true
    };
  },
  computed: {
    switchName() {
      return this.isStart ? "停止" : "开始";
    }
  },
  methods: {
    start() {
      this.isStart = !this.isStart;
    }
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(async () => {
        // let data = await fetch(5).then(data => {
        //   return data;
        // }).catch(err => {
        // });
        if (
          this.$refs["infinite-scroll"].cache.length <=
          this.$refs["infinite-scroll"].maxCache
        ) {
          let data = await axios.get("http://localhost:8000/list").then(res => {
            return res.data;
          });
          this.$refs["infinite-scroll"].catchData(data);
        }
      }, 2000);
    });
  },
  components: {
    VInfiniteScroll
  }
};
</script>
<style lang="less" scopped>
// .text-list {
//   width: 300px;
//   height: 100px;
//   border: 1px solid red;
//   .col {
//     width: 100%;
//     height: 100%;
//     box-sizing: border-box;
//     border: 1px solid white;
//     // display: table-cell;
//     // text-align: center;
//     // vertical-align: middle;
//     display: inline-block;
//     text-align: center;
//   }

//   .up {
//     // background: rgb(35, 151, 12);
//   }

//   .down {
//     // background: rgb(146, 6, 240);
//   }
// }
</style>