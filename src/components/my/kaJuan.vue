<template>
  <div>
    <van-nav-bar
      title="卡劵中心"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-tabs v-model="active">
      <van-tab title="全部卡劵">
        <div
          class="kajuan"
          v-show="item.ticketStatus == 'N' ? false : true"
          v-for="item in kajuan"
          :key="item.ticketId"
        >
          <van-panel
            :title="item.ticketTitle"
            :desc="item.ticketRule"
            :status="item.preferentialFee + '元'"
          >
            <p>
              有效时间：
              <span>{{ item.startTime }}</span> 至
              <span>{{ item.endTime }}</span>
            </p>
            <p>数量：{{ item.ticketNum }}</p>
            <div slot="footer">
              <van-button
                :disabled="item.ticketNum ? false : true"
                @click="getId(item.ticketId, item.ticketNum)"
                type="info"
                size="large"
              >
                领取
              </van-button>
            </div>
          </van-panel>
        </div>
      </van-tab>
      <van-tab title="我的卡劵">
        <van-swipe-cell
          v-show="item.useStatus == '1' ? true : false"
          v-for="(item, index) in kList"
          :key="index"
        >
          <van-cell class="kajuan">
            <van-panel
              :title="item.ticketInfo.ticketTitle"
              :desc="item.ticketInfo.ticketRule"
              :status="item.ticketInfo.preferentialFee + '元'"
            >
              <p>
                有效时间：
                <span>{{ item.ticketInfo.startTime }}</span> 至
                <span>{{ item.ticketInfo.endTime }}</span>
              </p>
            </van-panel>
          </van-cell>

          <template slot="right">
            <van-button
              @click="getUse"
              class="button1"
              square
              size="large"
              type="primary"
              text="使用"
            />
            <van-button
              class="button2"
              @click="deTicket(item.ticketCustomerId)"
              square
              size="large"
              type="danger"
              text="删除"
            />
          </template>
        </van-swipe-cell>
      </van-tab>
      <van-tab title="已使用卡劵">
        <van-swipe-cell
          v-show="item.useStatus == '2' ? true : false"
          v-for="(item, index) in kList"
          :key="index"
        >
          <van-cell class="kajuan">
            <van-panel
              :title="item.ticketInfo.ticketTitle"
              :desc="item.ticketInfo.ticketRule"
              :status="item.ticketInfo.preferentialFee + '元'"
            >
              <p>
                有效时间：
                <span>{{ item.ticketInfo.startTime }}</span> 至
                <span>{{ item.ticketInfo.endTime }}</span>
              </p>
            </van-panel>
          </van-cell>

          <template slot="right">
            <van-button
              class="button"
              @click="deTicket(item.ticketCustomerId)"
              square
              size="large"
              type="danger"
              text="删除"
            />
          </template>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kajuan: [],
      loginName: this.$store.getters.getLoginName,
      fdsaf: false,
      active: 0,
      mobile: this.$store.getters.getMobile,
      kList: []
    };
  },
  methods: {
    getUse() {
      this.$router.push("/Search");
    },
    onClickLeft() {
      console.log("返回");
      this.$router.go(-1);
    },
    deTicket(id) {
      console.log(id);
      this.$http
        .get("/shop/deleteCustomerTicket?id=" + id)
        .then(res => {
          console.log(res);
          this.getkajun();
          this.$toast("卡劵已删除！");
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取客户卡劵
    getkajun() {
      this.$http
        .get(
          "/shop/selectByCustomerMobile?" +
            "mobile=" +
            this.mobile +
            "&current=1&" +
            "size=100"
        )
        .then(res => {
          console.log(res);
          this.kList = res.data.data.customerTicketPage;
          console.log("this.kList", this.kList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取所有卡劵
    getAllTicket() {
      this.$http
        .get("/shop/selectAllTicket")
        .then(res => {
          console.log(res);
          this.kajuan = res.data.data;
          console.log(this.kajuan);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //领取课卷
    getId(id, num) {
      this.$http
        .get(
          "/shop/customerGetTicket?" +
            "ticketId=" +
            id +
            "&cLoginName=" +
            this.loginName
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.getkajun();
            this.getAllTicket();
            this.$toast("领取成功");
          } else if (res.data.code == 202) {
            this.$toast("该卡卷已领取！");
          } else if (num <= 0) {
            this.$toast("该卡卷已领完！");
          } else {
            this.$toast("领取失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.$store.getters.getLoginState) {
      this.getAllTicket();
      this.getkajun();
    } else {
      this.$router.push("/my");
    }
  },
  watch: {
    // this.getAllTicket()
    num(va) {
      this.num = va;
    }
  }
};
</script>

<style scoped>
.button1 {
  width: 50%;
  height: 100%;
  line-height: 48px;
  padding: 0px 10px;
}
.button {
  width: 100%;
  height: 100%;
  line-height: 48px;
  padding: 0px 10px;
}
.button2 {
  width: 50%;
  height: 100%;
  line-height: 48px;
  padding: 0px 10px;
  float: right;
}
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
.van-cell {
  font-size: 18px;
  padding: 10px;
  /* background-color: rgba(250, 84, 84, 0.1); */
}
.van-panel__footer {
  /* background-color: rgba(250, 84, 84, 0.1); */
}
.van-button--info {
  background-color: rgba(250, 84, 84, 0.5);
  border: 1px solid rgba(250, 84, 84, 0.5);
}
p {
  /* background-color: rgba(250, 84, 84, 0.1); */
  font-size: 12px;
  padding-left: 10px;
  color: #ccc;
}
.kajuan {
  padding: 15px;
  margin: 5px;
  border: 1px rgba(250, 84, 84) dashed;
  border-radius: 3%;
}
</style>
