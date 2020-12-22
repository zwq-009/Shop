<template>
  <div>
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      console.log("返回");
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
</style>
