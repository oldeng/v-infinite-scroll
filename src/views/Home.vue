<template>
  <div class="demo">
    <button v-on:click="start">{{switchName}}</button>
    <!-- <button v-on:click="add">Add</button> -->
    <!-- <button v-on:click="remove">Remove</button> -->
    <p>水平无限滚动列表</p>
    <transition-group class="container" name="list-complete" tag="div">
      <div ref="list1" key="swipper-left" class="swipper-item swipper-left" style="left: 0px;">
        <span v-for="item in items1" class="list-complete-item">{{ item }}</span>
      </div>
      <div ref="list2" key="swiper-right" class="swipper-item swipper-right" style="left: 300px;">
        <span v-for="item in items2" class="list-complete-item">{{ item }}</span>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5],
      items1: [1, 2, 3, 4, 5],
      items2: [1, 2, 3, 4, 5],
      nextNum: 10,
      switch: false,
    };
  },
  computed: {
    switchName () {
      return this.switch ? 'stop': 'start';
    }
  },
  methods: {
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

      let left1 = parseInt(list1.style.left);
      let left2 = parseInt(list2.style.left);

      left1= left1 - 60;
      left2 = left2 - 60;

      if (left1 < -300) {
         list1.style.left = '300px';
        // list1.style.visibility = 'hidden';
      } else {
        list1.style.left = left1 + 'px';
        list1.style.visibility = 'visible';
        if (left1 === -300) {
          setTimeout(() => {
            list1.style.left = '300px';
            list1.style.visibility = 'hidden';
            //执行更行数据
            this.items1.splice(0, 1);
            this.items1.splice(this.items1.length, 1, Math.round(Math.random() * 100));
          }, 300);
        }
      }

      if (left2 < -300) {
         list2.style.left = '300px';
        //  list2.style.visibility = 'hidden';
      } else {
        list2.style.left = left2 + 'px';
        list2.style.visibility = 'visible';
        if (left2 === -300) {
          setTimeout(() => {
            list2.style.left = '300px';
            list2.style.visibility = 'hidden';
            //执行更行数据\
             this.items2.splice(0, 1);
            this.items2.splice(this.items2.length, 1, Math.round(Math.random() * 100));
          }, 300)
        }
      }
    }
  },
  mounted () {
    setInterval(() => {
      // this.items.splice(this.items.length, 1, this.nextNum++);
      // this.items.splice(0, 1);
      this.move();
    }, 1000);
  }
};
</script>
<style lang="less" scopped>
.demo {

  .container {
    background: gray;
    width: 300px;
    height: 60px;
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
      left: 300px;
      background: green;
    }

    .swipper-item {
      width: 300px;
      height: 60px;
      box-sizing: border-box;
      transition: left .5s;

      .list-complete-item {
        width: 60px;
        height: 60px;
         box-sizing: border-box;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid white;
        color: white;
        float: left;
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