<template>
  <div>
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell
      title="修改密码"
      is-link
      to="/modifyPwd"
      style="padding-top:50px"
    />
    <van-cell title="绑定邮箱" is-link to="/bindEmail" />
    <van-button type="info" class="btn" size="large" @click="delLogin"
      >退出登录</van-button
    >
  </div>
</template>
<script>
export default {
  created() {
    if (this.$store.getters.getLoginState == false) {
      this.$router.push("/my");
    }
  },
  methods: {
    delLogin() {
      this.$store.commit("delLogin");
      this.$router.go(-1);
      this.$util.removeLocal("App_token");
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.btn {
  position: absolute;
  bottom: 5px;
}
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
