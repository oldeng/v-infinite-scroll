<template>
  <div class="v-infinite-scroll">
    <transition-group class="container" name="list-complete" tag="div">
      <div ref="up" key="scroll-up" :class="['scroll-item', 'scroll-up', animateClss]">
        <div ref="list-item" v-for="(row, index) in list" class="list-complete-item" :key="index" :style="rowColor(index)">
          <slot name="up" v-bind:up="row"></slot>
        </div>
      </div>
      <div ref="down" key="scroll-down" :class="['scroll-item', 'scroll-down', animateClss]">
        <div ref="list-item" v-for="(row, index) in listCopy" class="list-complete-item" :key="index" :style="rowColor(index)">
          <slot name="down" v-bind:down="row"></slot>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'v-infinite-scroll',
  data() {
    return {
      list: [],
      listCopy: [],
      cache: [],
      switch: false,
    };
  },
  props: {
    isStart: {
      type: [String, Boolean],
      default: false
    },
    row: {
      type: Number,
      default: 5
    },
    col: {
      type: Number,
      default: 5
    },
    maxCache: {
      type: Number,
      default: 15
    },
    direction: {
      type: String,
      default: "vertical"
    },
    interval: {
      type: Number,
      default: 1500
    },
    stripeColors: {
      type: Array,
      default: function () {
        return ['#081232', '#0B1F4C'];
      }
    }
  },
  computed: {
    animateClss() {
      return this.direction === "horizontal"
        ? "scroll-item-horizontal"
        : "scroll-item-vertical";
    }
  },
  watch: {
    isStart(newVal, oldVal) {
      this.switch = newVal;
    }
  },
  created() {
    this.switch = this.isStart;
  },
  methods: {
    rowColor (index) {
      return {
        'background-color': this.stripeColors[index % 2]
      }
    },
    catchData(data) {
      //当缓存数据过小加载数据
      if (!this.inited) {
        this.init(data);
      }
      if (this.cache.length <= this.maxCache) {
        this.cache.splice(this.cache.length, data.length, ...data);
      }
    },
    start() {
      this.switch = !this.switch;
    },
    init(data) {
      this.cache.splice(this.cache.length, data.length, ...data);

      if (this.direction === "vertical") {
        if (this.cache.length >= this.row) {
          //修改数据使列表重新渲染
          this.list = this.cache.splice(0, this.row);
          this.listCopy = this.list.slice();
          //是否初始化
          this.inited = true;
        }
      } else {
        if (this.cache.length >= this.col) {
          //修改数据使列表重新渲染
          this.list = this.cache.splice(0, this.col);
          this.listCopy = this.list.slice();
          //是否初始化
          this.inited = true;
        }
      }
    },
    stop() {
      //TODO
    },
    move() {
      if (this.direction === "horizontal") {
        this.horizonMove();
      } else {
        this.verticalMove();
      }
    },
    horizonMove() {
      if (
        !this.switch ||
        this.list.length < this.col ||
        this.listCopy.length < this.col
      ) {
        return;
      }
      //上半部分
      let up = this.$refs["up"];
      //下半部分
      let down = this.$refs["down"];

      let upLeft = parseInt(up.style.left);
      let downLeft = parseInt(down.style.left);

      upLeft = upLeft - this.itemWidth;
      downLeft = downLeft - this.itemWidth;
      if (upLeft < -this.width) {
        up.style.left = `${this.width}px`;
      } else {
        up.style.left = upLeft + "px";
        up.style.visibility = "visible";
        if (upLeft === -this.width) {
          //延时等待transition 执行完成再list的调整位置
          setTimeout(() => {
            up.style.left = `${this.width}px`;
            up.style.visibility = "hidden";
            //执行更行数据
            //当缓存中有多余的数据时修改数据
            if (this.cache.length > 0) {
              //修改数据使列表重新渲染
              this.list = this.cache.splice(0, this.col);
            }
            //修改时间可能有问题
          }, 300);
        }
      }

      if (downLeft < -this.width) {
        down.style.left = `${this.width}px`;
      } else {
        down.style.left = downLeft + "px";
        down.style.visibility = "visible";
        if (downLeft === -this.width) {
          setTimeout(() => {
            down.style.left = `${this.width}px`;
            down.style.visibility = "hidden";
            //执行更行数据\
            if (this.cache.length > 0) {
              this.listCopy = this.cache.splice(0, this.col);
            }
          }, 300);
        }
      }
    },
    verticalMove() {
      if (
        !this.switch ||
        this.list.length < this.row ||
        this.listCopy.length < this.row
      ) {
        return;
      }
      //上半部分
      let up = this.$refs["up"];
      //下半部分
      let down = this.$refs["down"];

      let top1 = parseInt(up.style.top);
      let top2 = parseInt(down.style.top);

      top1 = top1 - this.itemHeight;
      top2 = top2 - this.itemHeight;

      if (top1 < -this.height) {
        up.style.visibility = "hidden";
        up.style.top = `${this.height}px`;
        //延时执行
        setTimeout(() => {
          up.style.visibility = "visible";
        }, 300)
      } else {
        up.style.top = top1 + "px";
        up.style.visibility = "visible";
        if (top1 === -this.height) {
          //延时等待transition 执行完成再list的调整位置
          setTimeout(() => {
            up.style.top = `${this.height}px`;
            up.style.visibility = "hidden";
            //执行更行数据
            //当缓存中有多余的数据时修改数据
            if (this.cache.length > 0) {
              //修改数据使列表重新渲染
              this.list = this.cache.splice(0, this.row);
            }
            //修改时间可能有问题
          }, 300);
        }
      }

      if (top2 < -this.height) {
        down.style.visibility = 'hidden';
        down.style.top = `${this.height}px`;
        setTimeout(() => {
          down.style.visibility = 'visible';
        }, 300)
      } else {
        down.style.top = top2 + "px";
        down.style.visibility = "visible";
        if (top2 === -this.height) {
          setTimeout(() => {
            down.style.top = `${this.height}px`;
            down.style.visibility = "hidden";
            //执行更行数据\
            if (this.cache.length > 0) {
              this.listCopy = this.cache.splice(0, this.row);
            }
          }, 300);
        }
      }
    },
    initSize() {
      //垂直方向滚动
      if (this.direction === "vertical") {
        let up = this.$refs["up"];
        let down = this.$refs["down"];
        this.height = this.$el.offsetHeight;
        this.itemHeight = Math.ceil(this.height / this.row);
        //设置初始列表大小位置
        up.style.height = this.height + "px";
        down.style.height = this.height + "px";
        up.style.top = 0;
        down.style.top = `${this.height}px`;
      } else {
        //水平方向滚动
        let up = this.$refs["up"];
        let down = this.$refs["down"];
        this.height = this.$el.offsetHeight;
        this.width = this.$el.offsetWidth;
        this.itemWidth = Math.ceil(this.width / this.col);
        //设置初始列表大小位置
        up.style.height = this.height + "px";
        down.style.height = this.height + "px";
        up.style.left = 0;
        down.style.left = `${this.width}px`;
      }
    }
  },
  mounted() {
    //计算行初始高度
    this.initSize();
    setInterval(() => {
      this.move();
      //5行时最小时间间隔为800ms
    }, this.interval);
  },
  beforeUpdate() {
    //TODO
  },
  updated() {
    if (this.direction === "horizontal") {
      this.$refs["list-item"].forEach(item => {
        item.style.width = `${this.itemWidth}px`;
        item.style.height = `${this.height}px`;
        item.style.display = "inline-block";
        console.log(this.itemWidth);
      });
    } else {
      this.$refs["list-item"].forEach(item => {
        item.style.height = `${this.itemHeight}px`;
        console.log(this.itemHeight);
      });
    }
  },
  destroyed() {}
};
</script>
<style lang="less" scopped>
.v-infinite-scroll {
  width: 100%;
  height: 100%;
  .container {
    // background: gray;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

    .scroll-up {
      position: absolute;
      left: 0;
      // background: red;
    }

    .scroll-down {
      position: absolute;
      left: 0;
      // background: green;
    }

    .scroll-item {
      width: 100%;
      box-sizing: border-box;
      transition: top 0.5s;
      // transition: left 0.5s;
      .list-complete-item {
        box-sizing: border-box;
        display: block;
        position: relative;
        // display: flex;
        // justify-content: center;
        // align-items: center;
      }
      .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for below version 2.1.8 */ {
        opacity: 0;
        // transform: translateY(30px);
      }
      .list-complete-leave-active {
        position: absolute;
      }
    }
    //水平动画
    .scroll-item-horizontal {
      transition: left 0.5s;
    }
    //垂直动画
    .scroll-item-vertical {
      transition: top 0.5s;
    }
  }
}
</style>