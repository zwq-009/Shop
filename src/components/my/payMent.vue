<template>
  <div>
    <van-nav-bar
      style="position: fixed; top:0; width:100%; z-index:999"
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="div">
      <van-icon name="success" size="100px" />
    </div>
    <div style="padding-top:50px">
      <p style="text-align:center;margin-bottom:20px">
        {{ this.$route.query.msg }}
      </p>
      <van-button
        type="info"
        style="position: absolute; bottom: 30%;left: 40%;border-radius: 35px;height:70px;width:70px"
        @click="onClickLeft"
        >返回</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}
</style>
