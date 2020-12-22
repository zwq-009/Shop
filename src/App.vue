<template>
  <div>
    <div class="Overlay" v-show="lodingShow" z-index="2000">
      <van-loading color="#1989fa" class="loding" />
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["lodingShow"])
  },
  methods: {
    verficationLogin() {
      if (this.$util.getLocalStorage("App_token") == "") {
        return;
      }
      const token = this.$util.getLocalStorage("App_token");
      this.$http.get("/shop/checkToken/" + token).then(
        ({ data: data }) => {
          this.$store.commit("changeLoginState", data.data.phone);
          this.$store.commit("setLoginName", data.data.cLoginName);
          this.$http
            .get("/shop/selectByMobile", { mobile: data.data.phone })
            .then(item => {
              this.$store.commit(
                "setTximg",
                item.data.data.img ||
                  "http://192.168.3.88:8089/shop/downloadFile/247956e8-68a8-4167-98c6-bf1a839bb403.jpg"
              );
              this.$store.commit("setcId", item.data.data.cId);
            });
        },
        () => {}
      );
    }
  },
  created() {
    this.verficationLogin();
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.van-swipe__indicator {
  background-color: rgb(136, 136, 136) !important;
}
</style>
