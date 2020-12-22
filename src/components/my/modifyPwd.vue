<template>
  <div>
    <van-nav-bar
      title="修改密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group style="padding-top:50px">
      <van-field
        v-model="value1"
        type="email"
        placeholder="请输入邮箱"
        ref="email"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="email"
          v-show="checkd"
          >发送验证码</van-button
        >
        <span slot="button" v-show="!checkd">{{ time }}秒后重新发送</span>
      </van-field>
      <van-field
        v-model="yzm"
        type="text"
        placeholder="请输入验证码"
        v-show="!checkd"
      />
      <van-field
        v-model="value2"
        type="password"
        placeholder="请输入新密码"
        v-show="!checkd"
      />
      <van-field
        v-model="value3"
        type="password"
        placeholder="请确认新密码"
        v-show="!checkd"
      />
    </van-cell-group>
    <van-button
      type="info"
      @click="submit"
      style="position: absolute; bottom: 50%;left: 40%;border-radius: 35px;height:70px;width:70px"
      >提交</van-button
    >
  </div>
</template>
<script>
import { setInterval, clearInterval } from "timers";
export default {
  created() {
    if (this.$store.getters.getLoginState == false) {
      this.$router.push("/my");
    }
  },
  data() {
    return {
      value1: "",
      value2: "",
      value3: "",
      yzm: "",
      time: 60,
      flag: true,
      checkd: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    email() {
      const ragp = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (ragp.test(this.value1) == false) {
        this.$toast("请输入正确的邮箱格式");
        return;
      }
      this.$http
        .get("/shop/getVeriCodeByEmail", { email: this.value1 })
        .then(res => {
          this.$toast(res.data.msg);
        });
      this.checkd = false;
      if (!this.flag) return;
      this.flag = false;
      let timer = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          clearInterval(timer);
          this.time = 60;
          this.flag = true;
          this.checkd = true;
        }
      }, 1000);
    },
    submit() {
      if (this.flag == false) return;
      if (this.value2 != this.value3) {
        this.$toast("两次密码不一致");
        return;
      }
      let data = {
        email: this.value1,
        cLoginName: this.$store.getters.getLoginName,
        code: this.yzm,
        password: this.value3
      };
      this.$http.get("/shop/findPassword", data).then(res => {
        this.$toast(res.data.msg);
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
.van-nav-bar {
  position: fixed;
  z-index: 999;
  width: 100%;
}
</style>
