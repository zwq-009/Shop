<template>
  <div>
    <div>
      <van-nav-bar
        title="售后列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-tabs v-model="active">
        <van-tab title="商品售后">
          <div v-show="carData.length > 0 ? false : true">
            <p style="padding:20% 39%;color:#ccc">空空如也~</p>
            <van-button type="primary" size="large" click="moveHome">
              去购物 >>
            </van-button>
          </div>
          <div v-for="(item, i) in carData" :key="i">
            <div>
              <!-- 订单的头部 -->
              <div class="hot">
                <van-icon name="shop-collect" style="margin-left:100px" />
                <span style="font-size:14px">王牌买手</span>
                <span style="font-size:14px;margin-left:50px;color:red"></span>
              </div>
            </div>

            <!-- 订单商品 -->
            <div v-for="(elem, i) in item.orderDetailInfos" :key="i">
              <car :item="elem" :flag="true" :allgoods="true" />
            </div>
          </div>
        </van-tab>
        <van-tab title="运费退款"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import car from "../card/car";
export default {
  created() {
    if (this.$store.getters.getLoginState == false) {
      this.$dialog
        .alert({
          title: "提示",
          message: "你还未登陆,需要登陆才能访问"
        })
        .then(() => {
          this.$router.push("/my");
        });
    } else {
      this.shopCar();
    }
  },
  data() {
    return {
      active: 0,
      carData: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    moveHome() {
      this.$router.push("/home");
      this.$store.commit("getActive");
    },
    shopCar() {
      this.$http
        .get(`/shop/order/queryOrderBycId?cId=${this.$store.getters.getcId}`)
        .then(res => {
          if (res.data.code == 200 && res.data.data instanceof Array) {
            res.data.data.forEach(item => {
              if (
                item.orderStatus === "3" &&
                item.payStatus === "1" &&
                item.receiptStatus === "1"
              ) {
                this.carData.push(item);
              }
            });
          }
        });
    }
  },
  components: { car }
};
</script>

<style scoped lang="less">
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
.hot {
  display: flex;
  text-align: center;
  padding: 10px 10px;
  background-color: white;
  text-align: center;
}
</style>
