<template>
  <div>
    <!-- 热门推荐列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="immediateCheck"
    >
      <div class="hotList">
        <div v-for="(item, i) in itemData" :key="i" class="div">
          <div class="caritem" @click="moveInfo(item.itemId)">
            <img v-lazy="item.coverImg" />
            <p class="describe">{{ item.itemDetail }}</p>
            <p class="Price">￥{{ item.price }}</p>
          </div>
        </div>

        <!-- 结束热门推荐列表 -->
      </div>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemData: [],
      current: 1,
      size: 10,
      error: false,
      loading: false,
      finished: false,
      listSum: 10,
      immediateCheck: false
    };
  },
  methods: {
    moveInfo(id) {
      this.$router.push({
        name: "productDetails",
        path: "/productDetails",
        params: { id }
      });
    },
    getList() {
      this.$http
        .get(
          "/shop/shop/selectItemInfoList?current=" +
            this.current +
            "&size=" +
            this.size
        )
        .then(res => {
          this.itemData = res.data.data.records;
          this.listSum = res.data.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      this.size++;
      // console.log(this.size);
      this.getList();
      this.loading = false;
      // console.log(this.listSum);
      if (this.itemData.length >= this.listSum) {
        this.finished = true;
      } else {
        this.finished = false;
      }
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="less" scoped>
.hotList {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px 10px;
  .div {
    // position: relative;
    border-radius: 5px;
    margin: 10px 0;
    width: 48%;
    background-color: white;
  }
}
.caritem {
  position: relative;
  img {
    width: 100%;
    height: 200px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .describe {
    margin: 10px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .Price {
    margin: 10px 10px;
    font-weight: bold;
    color: red;
  }
}
</style>
