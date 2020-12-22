<template>
  <div>
    <van-nav-bar
      title="地址编辑"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div style="padding:50px 0">
      <van-address-edit
        :area-list="areaList"
        :address-info="info"
        show-postal
        :show-delete="showDelBtn"
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import assets from "../../assets/area";
import { setTimeout } from "timers";
export default {
  created() {
    if (this.$store.getters.getLoginState == false) {
      this.$router.push("/my");
    }
  },
  data() {
    return {
      areaList: assets,
      info: {
        name: this.$route.query.item ? this.$route.query.item.name : "",
        addressDetail: this.$route.query.item
          ? this.$route.query.item.address
          : "",
        tel: this.$route.query.item
          ? this.$route.query.item.tel
          : this.$store.getters.getMobile,
        isDefault: true
      },
      id: 0,
      showDelBtn: this.$route.query.item ? true : false,
      searchResult: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSave(content) {
      if (this.$route.query.item) {
        //编辑已有地址
        const b = this.$route.query.item;
        let a = {};
        a.customerAddressId = b.id;
        a.consigneeName = content.name;
        a.consigneeMobile = content.tel;
        a.consigineeAddress = content.addressDetail;
        a.addressStatus = content.isDefault ? "Y" : "N";
        this.$http.post("/shop/updateAddress", a).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$toast({
              message: res.data.msg,
              duration: 1
            });
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          } else {
            this.$toast({
              message: res.data.msg,
              duration: 1000
            });
          }
        });
      } else {
        //新增地址
        console.log("没有query");
        this.$toast("保存成功");
        var cc = {};
        cc.cId = this.$store.getters.getcId;
        cc.consigneeName = content.name;
        cc.consigneeMobile = content.tel;
        cc.consigineeAddress = content.addressDetail;
        cc.postalCode = content.postalCode;
        cc.addressStatus = content.isDefault ? "Y" : "N";
        this.$http.post("/shop/insertAddress", cc);
        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      }
    },
    onDelete() {
      this.$toast("delete");
      if (this.$route.query.item) {
        this.$http
          .get("/shop/deleteByAddressId", { id: this.$route.query.item.id })
          .then(res => {
            if (res.data.code == 200) {
              this.$toast({
                message: res.data.msg,
                duration: 1000
              });
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            }
          });
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "湖南长沙",
            address: "湖大科技院东栋431君思集团"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style scoped lang="less">
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
.van-nav-bar {
  position: fixed;
  z-index: 999;
  width: 100%;
}
</style>
