<template>
  <div class="vertical">
    <button class="btn" v-on:click="start">{{switchName}}</button>
    <div class="title-horizental-list">
      <v-infinite-scroll
        direction="horizontal"
        ref="h-scroll"
        :maxCache="55"
        :isStart="isStart"
        :col="15"
      >
        <template #up="{ up }">
          <div class="col up" v-for="(col, index) in up">{{col}}</div>
        </template>
        <template #down="{ down }">
          <div class="col down" v-for="(col, index) in down">{{col}}</div>
        </template>
      </v-infinite-scroll>
    </div>
    <div class="vertical-head">
      <div class="title-name num">序号</div>
      <div class="title-name train">车次</div>
      <div class="title-name from">出发</div>
      <div class="title-name to">到达</div>
      <div class="title-name apartTime">出发时间</div>
      <div class="title-name achiveTime">到达时间</div>
      <div class="title-name state">状态</div>
    </div>
    <div class="text-list">
      <v-infinite-scroll ref="infinite-scroll" :interval="5000" :isStart="isStart" :row="5">
        <template #up="{ up }">
          <div
            :class="['col','up', clazz[index]]"
            v-for="(col, index) in up"
            :style="stateColor(index, col)"
            :key="index"
          >{{col}}</div>
        </template>
        <template #down="{ down }">
          <div
            :class="['col','up', clazz[index]]"
            v-for="(col, index) in down"
            :style="stateColor(index, col)"
            :key="index"
          >{{col}}</div>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>
<script>
import { InfiniteScroll } from "../../dist/v-infinite-scroll.umd.js";
import '../../dist/v-infinite-scroll.css';
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
      isStart: true,
      clazz: ["num", "train", "from", "to", "apartTime", "achiveTime", "state"]
    };
  },
  computed: {
    switchName() {
      return this.isStart ? "停止" : "开始";
    }
  },
  methods: {
    stateColor(index, content) {
      if (index == 6 && content == "准点") {
        return {
          color: "rgba(102, 239, 255)"
        };
      } else if (index == 6 && content == "检票") {
        return {
          color: "goldenrod"
        };
      } else if (index == 6) {
        return {
          color: "red"
        };
      }
    },
    start() {
      this.isStart = !this.isStart;
    }
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(async () => {
        console.debug("准备获取数据");
        if (
          this.$refs["h-scroll"].cache.length <= this.$refs["h-scroll"].maxCache
        ) {
          console.info("缓存没满,可以抓数据");
          let data = await axios.get("http://localhost:8000/msg").then(res => {
            return res.data.msg;
          });
          this.$refs["h-scroll"].catchData(data);
        } else {
          console.info("不缓存数据");
        }
      }, 2000);
      setInterval(async () => {

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
    VInfiniteScroll: InfiniteScroll
  }
};
</script>
<style lang="less" scopped>
div {
  box-sizing: border-box;
}
.vertical {
  border: 1px solid red;
  padding: 10px;

  .btn {
    margin: 10px;
  }

  .title-horizental-list {
    width: 810px;
    height: 50px;
    border: 1px solid red;
    margin: 0 auto;
    background: rgba(30, 30, 30);
    .col {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      color: red;
      font-size: 30px;
      border: 1px solid red;
      // display: table-cell;
      // text-align: center;
      // vertical-align: middle;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .up {
      // background: rgb(35, 151, 12);
    }

    .down {
      // background: rgb(146, 6, 240);
    }
  }
  .title-text {
    display: flex;
    border: 1px solid red;
    width: 810px;
    height: 40px;
    margin: 0 auto;
    font-size: 30px;
  }
  .vertical-head {
    display: flex;
    box-sizing: border-box;
    width: 810px;
    margin: 0 auto;
    .title-name {
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      width: 80px;
      border: 1px solid red;
    }
    //序号
    .num {
      width: 60px;
    }
    .train {
      width: 100px;
    }
    .from {
      width: 200px;
    }
    .to {
      width: 200px;
    }
    .apartTime {
      width: 100px;
    }
    .achiveTime {
      width: 100px;
    }
    .state {
      width: 50px;
    }
  }
  .text-list {
    width: 810px;
    height: 320px;
    margin: 0 auto;
    box-sizing: border-box;
    background: rgba(30, 30, 30);

    .col {
      display: inline-block;
      border: 1px solid red;
      line-height: 60px;
      box-sizing: border-box;
    }
    //序号
    .num {
      width: 60px;
    }
    .train {
      width: 100px;
    }
    .from {
      width: 200px;
    }
    .to {
      width: 200px;
    }
    .apartTime {
      width: 100px;
    }
    .achiveTime {
      width: 100px;
    }
    .state {
      width: 50px;
    }

    // .up {
    //   // background: rgb(35, 151, 12);
    // }

    // .down {
    //   // background: rgb(146, 6, 240);
    // }
  }
}
</style>