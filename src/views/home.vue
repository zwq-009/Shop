<template>
  <div>
    <!-- 底部栏 -->
    <Footer></Footer>
    <!-- 头部 -->
    <div class="header">
      <van-search
        @click.native="getSearch"
        placeholder="请输入搜索关键词"
        disabled
        v-model="value"
      />
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activity.returnImg" :key="item">
        <img :src="item" width="100%" height="200" @click="getAllActivity" />
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item
        @click="getLocalityList(value[1])"
        v-for="value in diZhi"
        :key="value[0]"
        :icon="value[0]"
        :text="value[1] + '货源'"
      />
    </van-grid>
    <!-- 活动 -->
    <div class="activity">
      <h3>超值活动</h3>
      <van-row>
        <van-col v-for="item in activity.activityImg" :key="item" span="12">
          <div>
            <img @click="getAllActivity" :src="item" />
            <!-- {{item.activityInfo.activityImg}} -->
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- tab标签页 -->
    <van-tabs @click="Activity">
      <van-tab
        v-for="(item, index) in tabData"
        :key="item"
        :name="item"
        :title="tabData[index]"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="(item, index) in huoDong"
            :key="index"
            class="van-cell__title"
          >
            <img
              @click="getActivity(item.activityInfo.activityId)"
              width="100%"
              height="100px"
              :src="item.activityInfo.activityImg"
            />
            <!-- 活动轮播图 -->
            <van-swipe
              style="height:150px;margin-top:20px"
              indicator-color="white"
            >
              <van-swipe-item
                v-for="i in huoDong[index].itemInfos.length"
                :key="i"
              >
                <van-row>
                  <van-col
                    v-for="num in huoDong[index].itemInfos[i - 1].length"
                    :key="num"
                    span="8"
                  >
                    <img
                      @click="
                        moveInfo(
                          huoDong[index].itemInfos[i - 1][num - 1].itemId
                        )
                      "
                      :src="huoDong[index].itemInfos[i - 1][num - 1].coverImg"
                      alt="图片加载失败"
                    />
                  </van-col>
                </van-row>
                <van-row>
                  <van-col
                    v-for="num in huoDong[index].itemInfos[i - 1].length"
                    :key="num"
                    span="8"
                  >
                    <span>
                      {{ huoDong[index].itemInfos[i - 1][num - 1].price }}元
                    </span>
                  </van-col>
                </van-row>
              </van-swipe-item>
            </van-swipe>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Footer from "../components/TabBar/footer.vue";
export default {
  components: {
    Footer
  },
  data() {
    return {
      value: "",
      tabData: [],
      list: [],
      loading: false,
      finished: false,
      activity: [],
      lunBO: [],
      infos: [],
      diZhi: [],
      name: "全部",
      huoDong: []
    };
  },
  methods: {
    //获取活动名称，点击切换
    Activity(name) {
      this.name = name;
      this.$http
        .get(
          "/shop/activity/selectHomeActivityByName?activityName=" + this.name
        )
        .then(res => {
          console.log(res.data.data.HomeActivity);
          this.huoDong = res.data.data.HomeActivity;
          // console.log(this.huoDong);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //活动页
    getAllActivity() {
      this.$router.push({
        path: "/activityHome"
      });
    },
    //跳转详情
    moveInfo(id) {
      this.$router.push({
        name: "productDetails",
        path: "/productDetails",
        params: { id }
      });
    },
    //跳转对应活动id页
    getActivity(id) {
      this.$router.push({
        name: "activity",
        path: "/activity",
        query: { id: id }
      });
    },
    getList() {
      this.$router.push("/homeActivity");
    },
    //去搜索页
    getSearch() {
      this.$router.push("/Search");
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    //产地商品页
    getLocalityList(value) {
      this.$router.push({
        name: "locality",
        path: "/locality",
        query: { chanDi: value }
      });
      // console.log(value)
    }
  },
  created() {
    //获取轮播图，超值活动
    this.$http
      .get("/shop/activity/selectHomeActivity")
      .then(res => {
        console.log(res.data.data);
        this.activity = res.data.data;
        this.tabData = res.data.data.name;
      })
      .catch(err => {
        console.log(err);
      });
    //获取产地信息
    this.$http
      .get("/shop/shop/shopLocalityImg")
      .then(res => {
        console.log(res.data.data);
        this.diZhi = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
    //获取活动Tab页
    this.$http
      .get("/shop/activity/selectHomeActivityByName?activityName=" + this.name)
      .then(res => {
        console.log(res.data.data.HomeActivity);
        this.huoDong = res.data.data.HomeActivity;
        this.sum = this.huoDong[0].itemInfos.length;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.van-swipe-item {
  text-align: center;
}
.van-swipe-item > .van-row > .van-col > img {
  width: 100px;
  height: 100px;
}
/* 顶部搜索 */
.header {
  background-color: rgba(165, 42, 42, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}
.van-search {
  background-color: rgba(255, 255, 255, 0) !important;
  width: 200px;
  /* position:absolute; */
  color: white;
}
.van-search__content {
  background-color: rgba(247, 248, 250, 0.8);
  border-radius: 20px;
}

/* 超值活动 */
.van-col > div {
  width: 100%;
  height: 100%;
  /* background-color: aquamarine; */
  text-align: center;
}
.van-col > div > img {
  width: 100%;
  height: 150px;
}

/* 活动图片 */
.img {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

/* 活动块 */
.van-cell__title {
  height: 300px;
  background-color: rgb(241, 218, 218);
  margin: 15px;
}
</style>
