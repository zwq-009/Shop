<template>
  <div style="background-color:#f6f6f6">
    <div>
      <van-nav-bar
        style="position: fixed; top:0; width:100%; z-index:9999"
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div style="padding-top:45px; z-index:1">
      <van-tabs v-model="active" swipeable animated lazy-render>
        <!-- 全部模块 -->
        <van-tab title="全部">
          <!-- 全部部分——判断为空订单时显示图片 -->
          <div v-show="orderData.length > 0 ? false : true">
            <img src="../../assets/kk.jpg" width="100%" height="300px" />
          </div>
          <div v-for="(item, i) in orderData" :key="i" class="bg">
            <!-- 订单的头部 -->
            <div class="hot">
              <van-icon name="shop-collect" style="margin-left:100px" />
              <span style="font-size:14px">王牌买手</span>
              <span
                style="font-size:14px;margin-left:50px;color:red"
                v-text="
                  item.orderStatus == '0'
                    ? '进行中'
                    : item.orderStatus === '2'
                    ? '已取消'
                    : item.payStatus === '1'
                    ? item.orderStatus === '1'
                      ? '已完成'
                      : item.orderStatus === '3'
                      ? '退货中'
                      : '待发货'
                    : '代付款'
                "
              ></span>
            </div>
            <!-- 订单商品 -->
            <div v-for="(elem, i) in item.orderDetailInfos" :key="i">
              <car :item="elem" :flag="true" :allgoods="true" />
            </div>
            <!--可选按钮-->
            <div style="text-align:right; padding:10px 15px">
              <span style="position: absolute;right:60%">
                订单总价:
                <span style="color:red">￥{{ item.payAmount }}</span>
              </span>
              <van-button
                plain
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                @click="delOrder(item.orderId, item.orderStatus)"
                v-show="
                  !item.receiptStatus
                    ? item.orderStatus === '0'
                      ? item.payStatus === '0'
                        ? true
                        : false
                      : false
                    : false
                "
              >
                取消订单
              </van-button>
              <van-button
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                @click="payment(item)"
                v-show="
                  !item.receiptStatus
                    ? item.orderStatus === '0'
                      ? item.payStatus === '0'
                        ? true
                        : false
                      : false
                    : false
                "
              >
                立即支付
              </van-button>
              <van-button
                plain
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                @click="sale(item.orderId)"
                v-show="
                  item.receiptStatus === '1'
                    ? item.orderStatus === '1'
                      ? item.payStatus === '1'
                        ? true
                        : false
                      : false
                    : false
                "
              >
                申请售后
              </van-button>
              <van-button
                plain
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                @click="determineOrder(item.orderId)"
                v-show="
                  item.receiptStatus === '0'
                    ? item.orderStatus === '0'
                      ? item.payStatus === '1'
                        ? true
                        : false
                      : false
                    : false
                "
              >
                确认收货
              </van-button>
              <van-button
                plain
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                v-show="
                  item.receiptStatus === '1'
                    ? item.orderStatus === '3'
                      ? item.payStatus === '1'
                        ? true
                        : false
                      : false
                    : false
                "
              >
                取消退货
              </van-button>
              <van-button
                plain
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                @click="delOrder(item.orderId, '2')"
                v-show="
                  !item.receiptStatus
                    ? item.orderStatus === '2'
                      ? item.payStatus === '0'
                        ? true
                        : false
                      : false
                    : false
                "
              >
                删除订单
              </van-button>
            </div>
          </div>
        </van-tab>
        <!-- 代付款模块 -->
        <van-tab title="代付款">
          <div v-show="behalfData.length > 0 ? false : true">
            <img src="../../assets/kk.jpg" width="100%" height="300px" />
          </div>
          <div v-for="(item, i) in behalfData" :key="i" class="bg">
            <!-- 订单的头部 -->
            <div class="hot">
              <van-icon name="shop-collect" style="margin-left:100px" />
              <span style="font-size:14px">王牌买手</span>
            </div>
            <!-- 订单的商品 -->
            <div v-for="(elem, i) in item.orderDetailInfos" :key="i">
              <car
                :item="elem"
                :flag="true"
                @changCheckbox="p"
                :checkeds="checked"
                :NoAll="Noall"
              />
            </div>
            <div style="text-align:right; padding:10px 15px;position: relative">
              <span style="position: absolute;right:60%">
                订单总价:
                <span style="color:red">￥{{ item.payAmount }}</span>
              </span>
              <van-button
                plain
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                @click="delOrder(item.orderId)"
              >
                取消订单
              </van-button>
              <van-button
                round
                type="danger"
                size="small"
                v-show="true"
                @click="payment(item)"
              >
                立即支付
              </van-button>
            </div>
          </div>
        </van-tab>
        <!-- 待收货模块 -->
        <van-tab title="待收货">
          <div v-show="DeliverData.length > 0 ? false : true">
            <img src="../../assets/kk.jpg" width="100%" height="300px" />
          </div>
          <div v-for="(item, i) in DeliverData" :key="i" class="bg">
            <!-- 订单的头部 -->
            <div class="hot">
              <van-icon name="shop-collect" style="margin-left:100px" />
              <span style="font-size:14px">王牌买手</span>
            </div>
            <div v-for="(elem, i) in item.orderDetailInfos" :key="i">
              <car :item="elem" :allgoods="true" :flag="true" />
            </div>
            <div
              style="text-align:right; padding:10px 15px; position: relative"
            >
              <span style="position: absolute;right:60%">
                订单总价:
                <span style="color:red">￥{{ item.payAmount }}</span>
              </span>
              <van-button
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                @click="determineOrder(item.orderId)"
              >
                确认收货
              </van-button>
            </div>
          </div>
        </van-tab>
        <!-- 已完成模块 -->
        <van-tab title="已完成">
          <div v-show="overData.length > 0 ? false : true">
            <img src="../../assets/kk.jpg" width="100%" height="300px" />
          </div>
          <!--已完成shopcar-->
          <div v-for="(item, i) in overData" :key="i" class="bg">
            <!-- 订单的头部 -->
            <div class="hot">
              <van-icon name="shop-collect" style="margin-left:100px" />
              <span style="font-size:14px">王牌买手</span>
            </div>
            <div v-for="(elem, i) in item.orderDetailInfos" :key="i">
              <car :item="elem" :allgoods="true" :flag="true" />
            </div>
            <div
              style="text-align:right; padding:10px 15px; position: relative"
            >
              <span style="position: absolute;right:60%">
                订单总价:
                <span style="color:red">￥{{ item.payAmount }}</span>
              </span>
              <van-button
                plain
                round
                size="small"
                type="danger"
                style="margin:0 10px"
                @click="sale(item.orderId)"
              >
                申请售后
              </van-button>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-submit-bar
      v-show="
        $store.getters.getLoginState == true
          ? active == 1
            ? true
            : false
          : false
      "
      :price="zongjia * 100"
      button-text="合并支付"
    >
      <van-button
        size="mini"
        type="default"
        round
        style="margin:5px"
        @click="allGoods"
      >
        全选
      </van-button>
      <van-button
        size="mini"
        type="danger"
        round
        style="margin:5px"
        @click="allNoGoods"
      >
        删除全选
      </van-button>
    </van-submit-bar>
  </div>
</template>

<script>
import car from "../card/car.vue";
import { setTimeout } from "timers";
import Qs from "qs";
export default {
  data() {
    return {
      active: 0,
      carData: [],
      item: "",
      a: true,
      checked: false,
      twochecked: false,
      zongjia: 0,
      Noall: true,
      behalfData: [],
      DeliverData: [],
      orderData: [],
      overData: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/my");
    },
    p(e, a) {
      if (e == false) {
        this.zongjia += a.priceTotal;
        //判断全选
        var testZj = 0;
        this.behalfData.forEach(item => {
          testZj += item.priceTotal;
        });
        if (testZj == this.zongjia) {
          this.checked = true;
        }
      } else {
        this.zongjia = this.zongjia - a.priceTotal;
        //判断全选
        var Zj = 0;
        this.behalfData.forEach(item => {
          Zj += item.priceTotal;
          Zj -= a.priceTotal;
        });
        if (Zj != this.zongjia) {
          this.checked = false;
        }
      }
    },
    delOrder(orderId, status) {
      console.log(status);
      if (status === "2") {
        //删除订单
        this.$dialog
          .confirm({
            title: "请确认",
            message: "确定要删除订单吗?"
          })
          .then(() => {
            this.$http
              .delete(`/shop/order/deleteByOrderId/${orderId}`)
              .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$router.push({
                    path: "/pay",
                    query: { msg: "删除成功" }
                  });
                }
              });
          })
          .catch(() => {});
      } else if (status === "1") {
        this.determineOrder(orderId);
      } else {
        //取消订单
        this.$dialog
          .confirm({
            title: "请确认",
            message: "确定要取消订单吗?"
          })
          .then(() => {
            this.$http
              .put("/shop/order/cancelOrder", Qs.stringify({ orderId }))
              .then(res => {
                if (res.data.code == 200) {
                  this.$toast("取消成功");
                  setTimeout(() => {
                    this.$router.push({
                      path: "/pay",
                      query: { msg: res.data.message }
                    });
                  }, 500);
                }
              });
          })
          .catch(() => {
            return;
          });
      }
    },
    allGoods() {
      this.checked = true;
      if (this.checked == true) {
        var testZj = 0;
        this.behalfData.forEach(item => {
          item.orderDetailInfos.forEach(elem => {
            testZj += elem.priceTotal;
          });
        });
        this.zongjia = testZj;
      }
    },
    allNoGoods() {
      this.checked = false;
      this.Noall = !this.Noall;
      this.zongjia = 0;
    },
    payment(item) {
      var readyData = Qs.stringify({ orderId: item.orderId });
      this.$http.put("/shop/order/paySucceed", readyData).then(res => {
        if (res.data.code == 200) {
          this.$router.push({ path: "/pay", query: { msg: res.data.message } });
        }
      });
    },
    determineOrder(orderId) {
      this.$http
        .put(`/shop/order/confirmOrder?orderId=${orderId}`)
        .then(res => {
          this.$router.push({ path: "/pay", query: { msg: res.data.message } });
        });
    },
    obtainOder() {
      this.$http
        .get(`/shop/order/queryOrderBycId?cId=${this.$store.getters.getcId}`)
        .then(res => {
          if (res.data.data != null) {
            res.data.data.forEach(item => {
              this.orderData.push(item);
              console.log(item);
              if (item.payStatus === "0" && item.orderStatus == "0") {
                this.behalfData.push(item);
              }
              if (item.payStatus == "1" && item.orderStatus == "0") {
                this.DeliverData.push(item);
              }
              if (item.payStatus == "1" && item.orderStatus == "1") {
                this.overData.push(item);
              }
            });
          }
        });
    },
    sale(orderId) {
      this.$http.put("/shop/order/recedeOrder?orderId=" + orderId).then(res => {
        this.$router.push({ path: "/pay", query: { msg: res.data.message } });
      });
    }
  },
  created() {
    this.active = parseInt(this.$route.params.orderid);
    if (this.$store.getters.getLoginState == true) {
      //获取订单并且分类
      this.obtainOder();
    } else {
      this.$dialog
        .alert({
          title: "提示",
          message: "你还未登陆,需要登陆才能访问"
        })
        .then(() => {
          this.$router.push("/my");
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
.bg {
  background-color: #fff;
  margin: 10px 10px;
  padding-bottom: 50px;
}
</style>
