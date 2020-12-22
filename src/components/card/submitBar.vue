<template>
  <van-submit-bar
    :price="zhongjia * 100 - value"
    :button-text="buttonText"
    @submit="submit"
  >
  </van-submit-bar>
</template>

<script>
import Qs from "qs";
export default {
  created() {
    if (this.$store.getters.getLoginState == true) {
      this.TotalPrice();
    }
  },
  data() {
    return {
      cId: "",
      shopList: [],
      checked: false,
      zhongjia: 0,
      ress: {},
      shopCar: [],
      value: this.$store.getters.getValue,
      buttonText: "提交订单"
    };
  },
  methods: {
    submit() {
      if (this.$props.flag == true) {
        if (this.ress.consigneeName) {
          //生成订单
          var data = {
            consignee: this.ress.consigneeName,
            consigneeMobile: this.ress.consigneeMobile,
            consigneeAddress: this.ress.consigineeAddress,
            orderDetailInfos: this.shopCar,
            cId: this.$store.getters.getcId,
            cLoginName: this.$store.getters.getLoginName,
            couponAmount: this.value / 100
          };
          this.$http.post("/shop/order/insertOrder", data).then(res => {
            console.log(res);
            //清空购物车
            this.$http.delete(`/shop/Trolley/${this.$store.getters.getcId}`);
            //确认支付信息
            this.$dialog
              .confirm({
                title: "支付提示",
                message: "订单提交成功,现在支付吗?"
              })
              .then(() => {
                let readyData = Qs.stringify({
                  orderId: res.data.data.orderInfo.orderId
                });
                this.$http
                  .put("/shop/order/paySucceed", readyData)
                  .then(res => {
                    this.$router.push({
                      path: "/pay",
                      query: { msg: res.data.message, flag: true }
                    });
                  });
              })
              .catch(() => {
                this.$router.push("/order/1");
              });
          });
        } else {
          this.$toast("请选择地址");
        }
      } else {
        this.$router.push("/submitOrder");
      }
      this.$store.commit("setValue", 0);
    },
    TotalPrice() {
      if (this.$props.flag == true) this.buttonText = "立即支付";
      this.$http
        .get(`/shop/Trolley/${this.$store.getters.getcId}`)
        .then(res => {
          //确认订单的商品详情信息参数
          var shop = [];
          res.data.data.forEach(item => {
            let a = {};
            a.itemId = item.itemId;
            a.itemName = item.itemName;
            a.itemNum = item.num;
            a.itemPrice = item.price - this.value / 100;
            a.itemImg = item.itemImg;
            shop.push(a);
          });
          this.shopCar = shop;
          //计算总价
          var i = 0;
          res.data.data.forEach(item => {
            i += parseInt(item.num * item.price);
          });
          this.zhongjia = i;
        });
      this.$http
        .get("/shop/selectByCustomerId", { cId: this.$store.getters.getcId })
        .then(res => {
          if (res.data.code == 200) {
            res.data.data.some(item => {
              if (item.addressStatus == "Y") {
                this.ress = item;
                return;
              }
            });
          }
        });
    }
  },
  watch: {
    "$store.getters.getChecked": function() {
      this.zhongjia =
        this.$store.getters.getTotalPrice - this.$store.getters.getChecked;
    },
    "$store.getters.getValue": function() {
      this.value = this.$store.getters.getValue;
    }
  },
  props: {
    flag: {
      type: Boolean
    }
  }
};
</script>

<style lang="less" scoped></style>
