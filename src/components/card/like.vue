<template>
  <div>
    <van-icon :name="name" class="like" @click.stop="like" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "like-o"
    };
  },
  methods: {
    like() {
      if (this.name == "like") {
        this.name = "like-o";
      } else if (this.name == "like-o") {
        this.name = "like";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.like {
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
}
.van-icon-like {
  color: red;
}
</style>
