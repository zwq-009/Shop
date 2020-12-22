<template>
  <div>
    <div>
      <van-nav-bar
        title="地址管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        @add="onAdd"
        @edit="onEdit"
        @select="setDefault"
      />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (this.$store.getters.getLoginState == false) {
      this.$router.push("/my");
    } else {
      //默认的地址"Y"
      this.defaultAddress();
    }
  },
  data() {
    return {
      chosenAddressId: "",
      list: [
        // {
        //   id: "1",
        //   name: "张三",
        //   tel: "13000000000",
        //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        // }
      ],
      disabledList: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push("/addressEdit");
    },
    onEdit(item) {
      this.$router.push({ path: "/addressEdit", query: { item } });
    },
    setDefault(item) {
      let data = {
        customerAddressId: item.id,
        consigneeName: item.name,
        consigneeMobile: item.tel,
        consigineeAddress: item.address,
        addressStatus: "Y"
      };
      this.$http.post("/shop/updateAddress", data).then(res => {
        this.$toast(res.data.msg);
      });
    },
    defaultAddress() {
      this.$http
        .get(`/shop/selectByCustomerId?cId=${this.$store.getters.getcId}`)
        .then(res => {
          res.data.data.forEach(item => {
            let a = {};
            a.id = item.customerAddressId;
            a.name = item.consigneeName;
            a.tel = item.consigneeMobile;
            a.address = item.consigineeAddress;
            a.addressStatus = item.addressStatus;
            if (item.addressStatus == "Y") {
              this.chosenAddressId = item.customerAddressId;
            }
            this.list.push(a);
          });
        });
    }
  }
};
</script>

<style lang="css" scoped>
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
</style>
