<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar left-text="产地商品" left-arrow @click-left="onClickLeft" />
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
    <div class="hotList">
      <div v-for="item in data" :key="item.itemId" class="div">
        <div class="caritem" @click="moveInfo(item.itemId)">
          <img v-lazy="item.coverImg" />
          <p class="describe">{{ item.itemName }}</p>
          <p class="Price">￥{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      data: [],
      chanDi: this.$route.query.chanDi
    };
  },
  methods: {
    onClickLeft() {
      // console.log("返回");
      // this.$toast("返回");
      this.$router.go(-1);
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
          this.data = res.data.data;
          // this.value = "";
          if (res.data.code == 500) {
            this.$toast("暂无此商品");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$http
      .get("/shop/shop/getShopLocality?locality=" + this.chanDi)
      .then(res => {
        console.log(res);
        this.data = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.$route.query.chanDi);
  }
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
.van-dropdown-menu {
  width: 100%;
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
