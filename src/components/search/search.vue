<template>
  <div>
    <!-- 顶部栏 -->
    <van-nav-bar
      title="搜索商品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 搜索框 -->
    <div class="search">
      <van-search
        @keydown.enter="getGoods"
        placeholder="请输入搜索的商品名称"
        v-model="value"
      />
      <van-button @click="getGoods" type="info">搜索</van-button>
    </div>
    <!-- 商品列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="immediateCheck"
    >
      <div class="hotList">
        <div v-for="(item, index) in list" :key="item.itemId" class="div">
          <div class="caritem" @click="moveInfo(item.itemId)">
            <img v-lazy="list[index].coverImg" />
            <p class="describe">{{ list[index].itemDetail }}</p>
            <p class="Price">￥{{ list[index].price }}</p>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      list: [],
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
    onClickLeft() {
      console.log("返回");
      this.$router.push("/home");
    },
    moveInfo(id) {
      this.$router.push({
        name: "productDetails",
        path: "/productDetails",
        params: { id }
      });
    },
    getGoods() {
      this.$http
        .get("/shop/shop/getShopName?itemName=" + this.value)
        .then(res => {
          console.log(res);
          this.list = res.data.data;
          if (res.data.code == 500) {
            this.$toast("暂无此商品");
          }
        })
        .catch(err => {
          console.log(err);
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
          this.list = res.data.data.records;
          console.log(this.list);
          this.listSum = res.data.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      if (this.value) {
        this.size++;
        // console.log(this.size);
        this.getGoods();
        this.loading = false;
        // console.log(this.listSum);
        if (this.list.length >= this.listSum) {
          this.finished = true;
        } else {
          this.finished = false;
        }
      } else {
        this.size++;
        // console.log(this.size);
        this.getList();
        this.loading = false;
        // console.log(this.listSum);
        if (this.list.length >= this.listSum) {
          this.finished = true;
        } else {
          this.finished = false;
        }
      }
    }
  },
  created() {
    this.getList();
  }
  // created() {
  //   this.$http
  //     .get("/shop/shop/findAllShopInfo")
  //     .then(res => {
  //       console.log(res.data.data);
  //       this.list = res.data.data;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};
</script>
<style lang="less" scoped>
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
.search {
  width: 100%;
  height: 50px;
  line-height: 50px;
  .van-search {
    width: 75%;
    float: left;
  }
  .van-button {
    width: 20%;
    float: left;
    height: 30px;
    margin-top: 10px;
    line-height: 30px;
  }
}
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
