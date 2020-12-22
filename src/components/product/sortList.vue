<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 商品列表 -->
    <div class="hotList">
      <div v-for="item in list.itemInfo" :key="item.itemId" class="div">
        <div class="caritem" @click="moveInfo(item.itemId)">
          <img v-lazy="item.coverImg" />
          <p class="describe">{{ item.itemDetail }}</p>
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
      list: [],
      id: this.$route.query.id
    };
  },
  methods: {
    //详情页
    moveInfo(id) {
      this.$router.push({
        name: "productDetails",
        path: "/productDetails",
        params: { id }
      });
    },
    onClickLeft() {
      console.log("返回");
      this.$router.go(-1);
    }
  },
  created() {
    //查询子类id下的商品
    this.$http
      .get("/shop/category/SelectItemById?categoryId=" + this.id)
      .then(res => {
        console.log(res.data.data);
        this.list = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
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
