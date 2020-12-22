<template>
  <div>
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="getList"
      title="卡劵"
    />

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :show-exchange-bar="false"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      showList: false,
      List: [],
      mobile: this.$store.getters.getMobile,
      value: 0
    };
  },

  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      this.value = this.coupons[index].value;
      this.$store.commit("setValue", this.value);
    },
    onExchange() {
      this.List.forEach(item => {
        var condition = item.ticketInfo.ticketRule.split(",");
        if (item.ticketInfo.ticketStatus == "Y") {
          // console.log(condition)
          this.coupons.push({
            id: item.ticketInfo.ticketId, //卡劵ID
            name: item.ticketInfo.ticketTitle, //卡劵名称
            condition: "满" + condition[0] + "减" + condition[1], //减免条件
            startAt: (item.ticketInfo.startTime =
              Date.parse(new Date(item.ticketInfo.startTime)) / 1000), //起始时间
            endAt: (item.ticketInfo.endTime =
              Date.parse(new Date(item.ticketInfo.endTime)) / 1000), //结束时间
            // description:item., //描述
            // reason:item., //不可用原因
            value: item.ticketInfo.preferentialFee * 100,
            valueDesc: item.ticketInfo.preferentialFee, //优惠卷金额
            unitDesc: "元" //单位
          });
        } else {
          this.disabledCoupons.push({
            id: item.ticketInfo.ticketId, //卡劵ID
            name: item.ticketInfo.ticketTitle, //卡劵名称
            condition: item.ticketInfo.ticketRule, //减免条件
            startAt: (item.ticketInfo.startTime =
              Date.parse(new Date(item.ticketInfo.startTime)) / 1000), //起始时间
            endAt: (item.ticketInfo.endTime =
              Date.parse(new Date(item.ticketInfo.endTime)) / 1000), //结束时间
            // description:item., //描述
            // reason:item., //不可用原因
            value: item.ticketInfo.preferentialFee * 100,
            valueDesc: item.ticketInfo.preferentialFee, //优惠卷金额
            unitDesc: "元" //单位
          });
        }
      });

      // console.log(this.coupons);
      // console.log(this.disabledCoupons);
    },
    getList() {
      this.showList = !this.showList;
    }
  },
  created() {
    this.$http
      .get(
        "/shop/selectByCustomerMobile?" +
          "mobile=" +
          this.mobile +
          "&current=1&" +
          "size=100"
      )
      .then(res => {
        console.log(res.data.data.customerTicketPage);
        this.List = res.data.data.customerTicketPage;
        // this.List.forEach(item => {
        //   console.log(item.ticketInfo.customerTicketPage);
        // });
        this.onExchange();
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
