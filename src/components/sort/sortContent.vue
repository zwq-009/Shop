<template>
  <div>
    <van-grid :gutter="10" :column-num="3">
      <van-grid-item
        v-model="activeKey"
        v-for="item in fenleiList"
        :key="item.categoryId"
        :icon="item.categoryImage"
        :text="item.categoryName"
        @click="getSortList(item.categoryId)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      fenleiList: [],
      activeKey: 0
    };
  },
  methods: {
    getSortList(id) {
      this.$router.push({
        name: "sortList",
        path: "/sortList",
        query: { id: id }
      });
    }
  },
  created() {
    // console.log(this.$route.query);
    // this.$http
    //   .get("/shop/category/selectByParent?listParent=" + this.name)
    //   .then(res => {
    //     console.log(res);
    //     this.fenleiList = res.data.data;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // // console.log(this.name);
    // switch (this.name) {
    //   case "上装":
    //     this.active = 0;
    //     break;
    //   case "裙装":
    //     this.active = 1;
    //     break;
    //   case "裤装":
    //     this.active = 2;
    //     break;
    //   case "外套":
    //     this.active = 3;
    //     break;
    //   case "男装":
    //     this.active = 4;
    //     break;
    //   case "箱包":
    //     this.active = 5;
    //     break;
    //   case "配饰":
    //     this.active = 6;
    //     break;
    //   case "鞋子":
    //     this.active = 7;
    //     break;
    // }
  },
  watch: {
    name(va) {
      this.$http
        .get("/shop/category/selectByParent?listParent=" + va)
        .then(res => {
          console.log(res.data.data);
          this.fenleiList = res.data.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
