<template>
  <div class="demo">
    <transition-group class="container" name="list-complete" tag="div">
      <div ref="list1" key="swipper-left" class="swipper-item swipper-left" style="top: 0px;">
        <div v-for="row in body1" class="list-complete-item">
          <slot name="up" v-bind:up="row"></slot>
        </div>
      </div>
      <div ref="list2" key="swiper-right" class="swipper-item swipper-right" style="top: 300px;">
        <div v-for="row in body2" class="list-complete-item">
          <slot name="down" v-bind:down="row"></slot>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
let rowNum = 6;
    async function fetch(count) {
      let data = [];
      console.log('开始获取数据');
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
          console.log('获取数据为',data);
        }, 1000)
      });
    }
export default {
  data() {
    return {
      body1: [
        [
          'r1-c1', 'r1-c2', 'r1-c3'
        ],
        [
          'r2-c1', 'r2-c2', 'r2-c3'
        ],
        [
          'r3-c1', 'r3-c2', 'r2-c3'
        ],
        [
          'r4-c1', 'r4-c2', 'r4-c3'
        ],
        [
          'r5-c1', 'r5-c2', 'r5-c3'
        ]
      ],
      body2: [
        [
          'r1-c1', 'r1-c2', 'r1-c3'
        ],
        [
          'r2-c1', 'r2-c2', 'r2-c3'
        ],
        [
          'r3-c1', 'r3-c2', 'r2-c3'
        ],
        [
          'r4-c1', 'r4-c2', 'r4-c3'
        ],
        [
          'r5-c1', 'r5-c2', 'r5-c3'
        ]
      ],
      cache: [],
      nextNum: 10,
      switch: false,
      counter: 6,
    };
  },
  props: {
    isStart: {
      type: [String, Boolean],
      default: false,
    }
  },
  watch: {
    isStart (newVal, oldVal) {
      this.switch = newVal;
    }
  },
  computed: {

  },
  created () {
    this.switch = this.isStart;
  },
  methods: {
    catchData () {
      this.cacheTimer = setInterval(async () => {
        if(this.cache.length <= 10) {
          
          let data = await fetch(5).then(data => {
            return data;
          }).catch(err => {

          });
          this.cache.splice(this.cache.length, data.lenth, ...data);
          console.log('cache==>', this.cache);
        }
      }, 2000)
    },
    start () {
      this.switch = !this.switch;
    },
    stop () {},
    move () {

      if (!this.switch) {
        return;
      }
      let list1 = this.$refs['list1'];
      let list2 = this.$refs['list2'];

      let top1 = parseInt(list1.style.top);
      let top2 = parseInt(list2.style.top);

      top1= top1 - 60;
      top2 = top2 - 60;

      if (top1 < -300) {
         list1.style.top = '300px';
        // list1.style.visibility = 'hidden';
      } else {
        list1.style.top = top1 + 'px';
        list1.style.visibility = 'visible';
        if (top1 === -300) {
          //延时等待transition 执行完成再list的调整位置
          setTimeout(() => {
            list1.style.top = '300px';
            list1.style.visibility = 'hidden';
            //执行更行数据
            console.log('list1 -->this', this);
            //当缓存中有多余的数据时修改数据
            if (this.cache.length >= 5) {
                //修改数据使列表重新渲染
                this.body1 = this.cache.splice(0, 5);
            }
             
          }, 300);
        }
      }

      if (top2 < -300) {
         list2.style.top = '300px';
        //  list2.style.visibility = 'hidden';
      } else {
        list2.style.top = top2 + 'px';
        list2.style.visibility = 'visible';
        if (top2 === -300) {
          setTimeout(() => {
            list2.style.top = '300px';
            list2.style.visibility = 'hidden';
            //执行更行数据\
            console.log('list2 -->this', this);
            if (this.cache.length >= 5) {
              this.body2 = this.cache.splice(0, 5);
            }
             
          }, 300)
        }
      }
    }
  },
  mounted () {
    setInterval(() => {
      this.move();

    }, 4000);
    this.catchData();
  },
  destroyed () {
    clearInterval(this.cacheTimer);
    this.cacheTimer = null;
  }
};


</script>
<style lang="less" scopped>
.demo {
  .container {
    // border: 1px solid green;
    background: gray;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    box-sizing: border-box;

    .swipper-left {
      position: absolute;
      left: 0;
      background: red;
    }

    .swipper-right {
      position: absolute;
      left: 0;
      background: green;
    }

    .swipper-item {
      width: 300px;
      height: 300px;
      box-sizing: border-box;
      transition: top 0.5s;

      .list-complete-item {
        width: 300px;
        height: 60px;
        box-sizing: border-box;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid white;
        color: white;

        .col {
          width: 100px;
          height: 60px;
          box-sizing: border-box;
          border: 1px solid white;
        }
      }
      .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
      }
      .list-complete-leave-active {
        position: absolute;
      }
    }
  }
}
</style>