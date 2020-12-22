<template>
  <div>
    <van-nav-bar left-text="找回密码" left-arrow @click-left="onClickLeft" />
    <p>
      <van-field v-model="email" placeholder="请输入邮箱">
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="emailyz"
          v-show="btnflag"
          >发送验证码</van-button
        >
        <span slot="button" v-show="!btnflag">{{ totalTime }}秒后重新发送</span>
      </van-field>
      <van-field v-model="code" placeholder="请输入验证码" v-show="flag" />
      <van-field
        v-model="cLoginName"
        placeholder="请输入登录名"
        v-show="flag"
      />
      <van-field v-model="password" placeholder="请输入新密码" v-show="flag" />
    </p>

    <van-button
      style="position: absolute; bottom: 50%;left: 40%;border-radius: 35px;height:70px;width:70px"
      type="info"
      v-show="flag"
      @click="submit"
      >提交</van-button
    >
  </div>
</template>
<script>
// import { clearInterval } from "timers";
export default {
  data() {
    return {
      email: "",
      emailyzm: "",
      flag: false,
      password: "",
      code: "",
      cLoginName: "",
      totalTime: 60,
      canClick: true,
      btnflag: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    emailyz() {
      if (this.email == "") {
        this.$toast("请输入邮箱");
        return;
      }
      this.flag = true;
      this.btnflag = false;
      if (!this.canClick) return;
      this.canClick = false;
      let time = setInterval(() => {
        this.totalTime--;
        if (this.totalTime <= 0) {
          window.clearInterval(time);
          this.canClick = true;
          this.btnflag = true;
          this.totalTime = 60;
        }
      }, 1000);
      this.$http
        .get("/shop/getVeriCodeByEmail", { email: this.email })
        .then(res => {
          console.log(res);
        });
    },
    submit() {
      //倒计时
      var data = {
        email: this.email,
        code: this.code,
        password: this.password,
        cLoginName: this.cLoginName
      };
      this.$http.get("/shop/findPassword", data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
</style>
