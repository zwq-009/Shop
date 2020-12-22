<template>
  <van-goods-action style="z-index:99">
    <van-goods-action-icon icon="like-o" text="收藏" />
    <van-goods-action-icon icon="chat-o" text="咨询" />
    <van-goods-action-icon icon="cart-o" text="购物车" />
    <van-goods-action-button
      type="warning"
      text="加入购物车"
      @click="getShow"
    />
  </van-goods-action>
</template>
<script>
// import { Toast } from 'vant'
// import { format } from 'path';
export default {
  data() {
    return {
      flag: false
    };
  },
  methods: {
    // onClickIcon() {
    //   this.$toast("点击图标");
    // },
    // onClickButton() {
    //   this.$toast("点击按钮");
    // }
    getShow() {
      this.$emit("getShow");
    }
  }
};
</script>
