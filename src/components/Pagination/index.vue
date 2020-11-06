<template>
  <div class="pagination">
    <button :disabled="currentPageNum === 1"
    @click="$emit('changeNum',currentPageNum -1)"
    >上一页</button>
    <!-- <button v-if="startEnd.start > 1" @click="$emit('changeNum',1)">1</button> -->
    <button v-if="startEnd.start !== 1" @click="$emit('changeNum',1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- vfor 和 v-if两个指令可以混用，如果混用了，vfor比vif高 -->
    <button
    :class="{active:currentPageNum === page}"
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changeNum',page)"
    >
      {{ page }}
    </button>

    <button v-if="startEnd.end < totalPageNum - 1">···</button>
    <!-- <button v-if="startEnd.end < totalPageNum" @click="$emit('changeNum',totalPageNum)">{{ totalPageNum }}</button> -->
    <button v-if="startEnd.end !== totalPageNum" @click="$emit('changeNum',totalPageNum)">{{ totalPageNum }}</button>
    <button :disabled="currentPageNum === totalPageNum" @click="$emit('changeNum',currentPageNum+1)">下一页</button>

    <button style="margin-left: 30px">{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPageNum: Number,
    pageSize: Number,
    total: {
      type: Number,
      default: 0,
    },
    continueNum: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // 总页数
    totalPageNum() {
      //返回     上去取整  （ 总条数  /   每页条数 ）
      return Math.ceil(this.total / this.pageSize);
    },
    // 开始
    startEnd() {
      //    当前页          连续页数        总页数
      let { currentPageNum, continueNum, totalPageNum } = this;
      let start, end, disNum;
      //      总页数    <= 连续页数;
      if (totalPageNum <= continueNum) {
        // 如果我计算出来的总页数比连续页数小
        start = 1;
        end = totalPageNum;
      } else {
        //   开始      当前页      -  向下取整  （ 连续页数/2）
        start = currentPageNum - Math.floor(continueNum / 2);
        //    结束      当前页    +     向下取整 （连续页数 /2）
        end = currentPageNum + Math.floor(continueNum / 2);

        // 修正左右两边的情况
        // 第一种
        // if(start <1){
        //     start=1
        //     end=continueNum
        // }
        // if(end >totalPageNum){
        //   end = totalPageNum
        //   start=totalPageNum-continueNum
        // }
        // 第二种  定一个插值 disNum
        if (start < 1) {
          disNum = 1 - start;
          start += disNum;
          end += disNum;
        }
        if (end > totalPageNum) {
          disNum = end - totalPageNum;
          start -= disNum;
          end -= disNum;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
