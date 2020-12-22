<template>
  <div>
    <!-- 底部栏 -->
    <Footer></Footer>
    <!-- 侧边栏 -->
    <van-nav-bar left-text="分类" />
    <div class="left">
      <van-sidebar @change="change(activeKey)" route v-model="activeKey">
        <van-sidebar-item v-for="item in fenLei" :key="item" :title="item" />
      </van-sidebar>
    </div>
    <!-- <router-view></router-view> -->
    <!-- 右侧内容区 -->
    <sortContent :name="name"></sortContent>
  </div>
</template>
<script>
import Footer from "../components/TabBar/footer.vue";
import sortContent from "../components/sort/sortContent.vue";
export default {
  components: {
    Footer,
    sortContent
  },
  data() {
    return {
      activeKey: 0,
      fenLei: [],
      name: ""
    };
  },
  created() {
    this.$http
      .get("/shop/category/getListParent")
      .then(res => {
        console.log(res);
        this.fenLei = res.data.data;
        this.name = this.fenLei[0];
        // this.getSelectByParent()
        console.log(this.name);
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(this.name)
  },
  methods: {
    getSelectByParent() {
      this.$http
        .get("/shop/category/selectByParent?listParent=" + this.name)
        .then(res => {
          console.log(res);
          // this.fenLei = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    change(activeKey) {
      // console.log(index)
      this.name = this.fenLei[activeKey];
      // console.log(this.name);
    }
  }
};
</script>
<style scoped>
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
.left {
  float: left;
}
</style>
