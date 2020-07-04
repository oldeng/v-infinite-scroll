#预览

![scroll-preview.gif](https://github.com/oldeng/v-infinite-scroll/blob/master/src/assets/v-infinite-scroll.gif)


#安装

```
npm install @oldeng/v-infinite-scroll
```

#使用

```js
import { VInfoniteScroll } from '@oldeng/v-infinite-scroll'
//局部注册
```
或者
```js
import { VInfoniteScroll } from '@oldeng/v-infinite-scroll'
Vue.use(VInfoniteScroll)
```
#参数
|  参数名 | 取值范围   | 说明|
|---|---|---|
| isStart|Boolean |是否开始滚动|
|  row | Number |垂直滚动列表中显示行数|
|  col | Number |垂直滚动列表中显示行数|
|  maxCache | Number |最大缓存数据|
|  direction | "horizontal"或“vertical” |垂直滚动列表中显示行数|
|  interval | Number |滚动间隔毫秒值（ms）|
#范例
1. 水平滚动
2. 垂直滚动
>详细代码参考源码中Demo代码
##水平滚动
```js
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
```
##垂直滚动
```js
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
```

#调试
>源码调试需要开启vmock插件模拟接口数据

##运行vmock
模拟数据服务默认端口为8000
```
npm run vmock
```

#npm地址

[npm传送门](https://github.com/oldeng/v-infinite-scroll)

#Github地址

[源码传送门](https://github.com/oldeng/v-infinite-scroll)
