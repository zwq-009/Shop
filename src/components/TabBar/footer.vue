<template>
  <div>
    <van-tabbar style="z-index:999" v-model="active">
      <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item @click="getContent" icon="goods-collect-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
      // name: "上装"
    };
  },
  methods: {
    getContent() {
      this.$router.push({
        name: "Sort",
        path: "/sort"
      });
    }
  },
  created() {
    switch (this.$route.path) {
      case "/home":
        this.active = 0;
        break;
      case "/sort":
        this.active = 1;
        break;
      case "/cart":
        this.active = 2;
        break;
      case "/my":
        this.active = 3;
        break;
    }
  }
};
</script>
<style scoped>
.van-tabbar-item--active {
  color: red;
}
</style>
