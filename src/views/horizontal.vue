<template>
  <div class="horizontal-demo">
    <button class="btn" v-on:click="start">{{switchName}}</button>
    <div class="horizental-wraper">
      <v-infinite-scroll
        direction="horizontal"
        ref="infinite-scroll"
        :maxCache="15"
        :isStart="isStart"
        :col="5"
      >
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
      let _this = this;
      setInterval(async () => {
        console.debug("准备获取数据");
        if (
          this.$refs["infinite-scroll"].cache.length <=
          this.$refs["infinite-scroll"].maxCache
        ) {
          console.info("缓存没满,可以抓数据");
          let data = await axios
            .get("http://localhost:8000/horizon")
            .then(res => {
              return res.data;
            });
          this.$refs["infinite-scroll"].catchData(data);
        } else {
          console.info("不缓存数据");
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
div {
    box-sizing: border-box;
}
.horizontal-demo {
   border: 1px solid red;
   padding: 10px;

   .btn {
       margin: 10px;
   }

  .horizental-wraper {
    width: 310px;
    height: 50px;
    // border: 1px solid red;
        box-sizing: border-box;
    margin: 0 auto;

    .col {
      width: 100%;
      height: 50%;
      box-sizing: border-box;
      color: red;
      font-size: 20px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: 1px solid red;
      text-align: center;
    }

    .up {
      // background: rgb(35, 151, 12);
    }

    .down {
      // background: rgb(146, 6, 240);
    }
  }
}
</style>