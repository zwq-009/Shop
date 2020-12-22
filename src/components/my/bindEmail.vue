<template>
  <div>
    <van-nav-bar
      title="绑定邮箱"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group style>
      <van-field
        v-model="sms"
        center
        clearable
        label="邮箱验证"
        placeholder="请输入邮箱"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="sendEmail"
          v-show="flag"
          >发送邮箱验证</van-button
        >
        <span slot="button" v-show="!flag">{{ s }}秒后重试</span>
      </van-field>
    </van-cell-group>
  </div>
</template>
<script>
import { setInterval } from "timers";
export default {
  data() {
    return {
      sms: "",
      flag: true,
      s: 60
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    sendEmail() {
      this.flag = false;
      this.s = 60;
      clearInterval(timers);
      let timers = setInterval(() => {
        if (this.s == 0) {
          clearInterval(timers);
          this.flag = true;
        } else {
          this.s--;
        }
      }, 1000);
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
