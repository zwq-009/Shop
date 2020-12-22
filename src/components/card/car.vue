<template>
  <div class="container-car">
    <div
      style="padding-left:5px"
      @click="goodsBtn($props.item)"
      v-show="!$props.allgoods"
    >
      <van-checkbox v-model="checked" checked-color="red"></van-checkbox>
    </div>
    <div style="padding:10px 10px" @click="moveInfo($props.item.itemId)">
      <img :src="this.$props.item.itemImg" width="100" height="120" />
    </div>
    <div class="flex" @click="moveInfo($props.item.itemId)">
      <p class="describe">{{ this.$props.item.itemName }}</p>
      <div class="div">
        <p>红色:M | {{ $props.item.num || $props.item.itemNum }}件</p>
      </div>
      <div
        style="display: flex;align-items: center;justify-content:space-between;padding-top:5px"
      >
        <div>
          <span style="color:rgb(163, 163, 163); font-size:12px">
            商品总计:
          </span>
          <span style="color:red;font-weight:bold">
            ￥{{
              $props.item.priceTotal || $props.item.price * $props.item.num
            }}
          </span>
        </div>
        <van-button
          type="danger"
          size="mini"
          round
          @click.stop="
            edit(
              $store.getters.getcId,
              $props.item.itemId,
              $props.item.price * $props.item.num
            )
          "
          v-if="this.$props.flag ? false : true"
        >
          删除
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  watch: {
    "$props.checkeds": function(a) {
      if (a == true) {
        this.checked = true;
      }
    },
    "$props.NoAll": function() {
      this.checked = false;
    }
  },
  data() {
    return {
      checked: false
    };
  },
  methods: {
    moveInfo(id) {
      if (this.$props.flag) {
        return;
      } else {
        this.$router.push({ name: "productDetails", params: { id } });
      }
    },
    edit(cId, itemId, delPrice) {
      this.$store.commit("changeChecked", delPrice);
      this.$emit("changeC", this.$store.getters.getChecked);
      this.$http.delete(`/shop/Trolley/${cId}/${itemId}`).then(() => {
        this.$router.push({ path: "/pay", query: { msg: "删除成功" } });
      });
    },
    goodsBtn(item) {
      // console.log()
      this.$emit("changCheckbox", this.checked, item);
    }
  },
  props: ["item", "flag", "checkeds", "NoAll", "allgoods"]
};
</script>

<style scoped lang="less">
.container-car {
  overflow-x: hidden;
  background-color: white;
  display: flex;
  align-items: center;
  position: relative;
  .flex {
    width: 55%;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    position: absolute;
    top: -27%;
    left: 38%;
    .describe {
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .div {
      border: 1px solid #ccc;
      background-color: #f6f6f6;
      width: 99%;
      padding: 5px 5px;
      height: 40px;
      overflow-y: scroll;
      p {
        font-size: 12px;
        color: rgb(163, 163, 163);
      }
    }
  }
}
</style>
