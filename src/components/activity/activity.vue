<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar left-text="活动商品" left-arrow @click-left="onClickLeft" />
    <!-- 搜索框 -->
    <div class="search">
      <van-search placeholder="请输入搜索的商品名称" v-model="value" />
      <van-button @click="getGoods" type="info">搜索</van-button>
    </div>
    <!-- 下拉列表 -->
    <van-dropdown-menu>
      <van-dropdown-item
        @change="change()"
        ref="input"
        v-model="value1"
        :options="option1"
      />
      <van-dropdown-item
        @change="change()"
        ref="input1"
        v-model="value2"
        :options="option2"
      />
    </van-dropdown-menu>
    <!-- 商品列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="immediateCheck"
    >
      <div class="hotList">
        <div v-for="item in data" :key="item.itemId" class="div">
          <div class="caritem" @click="moveInfo(item.itemId)">
            <img v-lazy="item.coverImg" />
            <p class="describe">{{ item.itemName }}</p>
            <p class="Price">￥{{ item.price }}</p>
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
      value1: 0,
      value2: "a",
      option1: [{ text: "全部商品", value: 0 }],
      option2: [
        { text: "价格升序", value: "a" },
        { text: "价格降序", value: "b" }
      ],
      msg: "",
      current: 1,
      size: 5,
      error: false,
      loading: false,
      finished: false,
      listSum: "",
      immediateCheck: false,
      data: [],
      input: 0,
      input1: "a",
      activityId: this.$route.query.id
    };
  },
  methods: {
    onClickLeft() {
      // console.log("返回");
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
          this.value2 = "a";
          if (res.data.code == 500) {
            this.$toast("暂无此商品");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      this.$http
        .get(
          "/shop/activity/selectActivity?" +
            "activityId=" +
            this.activityId +
            "&" +
            "msg=" +
            this.msg +
            "&" +
            "current=" +
            this.current +
            "&" +
            "size=" +
            this.size
        )
        .then(res => {
          console.log(res);
          this.data = res.data.data.itemInfos;
          this.listSum = res.data.data.itemCount;
          console.log(this.listSum);
        })
        .catch(err => {
          console.log(err);
        });
    },
    change() {
      this.input = this.value1;
      this.input1 = this.value2;
      // console.log(this.input);
      // console.log(this.input1);
      if ((this.input == 0) & (this.input1 == "a")) {
        this.msg = "";
        this.getData();
      } else if ((this.input == 0) & (this.input1 == "b")) {
        this.msg = "desc";
        this.getData();
      }
    },
    onLoad() {
      this.size++;
      console.log(this.size);
      this.getData();
      this.loading = false;
      // console.log(this.listSum);
      if (this.data.length >= this.listSum) {
        this.finished = true;
      }
    }
  },
  created() {
    this.getData();
    console.log(this.activityId);
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
