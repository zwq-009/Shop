<template>
  <div class="login">
    <van-nav-bar left-text="登陆" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-field
        v-model="cLoginName"
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <br />
    <van-button type="info" @click="login">登陆</van-button>
    <p style="padding:20px 0">
      <a
        style="color:#37a3ff;font-size:12px;text-decoration:underline"
        @click="moveForget"
        >忘记密码?</a
      >
    </p>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import jwtDecode from "jwt-decode";
export default {
  data() {
    return {
      cLoginName: "",
      password: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/my");
    },
    login() {
      var customer = {
        cLoginName: this.cLoginName,
        password: this.password
      };
      this.$http.post("/shop/testlogin", customer).then(res => {
        console.log(res);
        if (res.data.code == 500) {
          this.$notify(res.data.message);
        } else if (res.data.code == 200) {
          this.$util.setLocalStorage("App_token", res.data.data.token); //本地储存token
          this.$store.commit("setcId", res.data.data.customer.cId);
          const token = this.$util.getLocalStorage("App_token");
          const a = jwtDecode(token);
          console.log(a);
          this.$toast({
            message: "登陆成功",
            duration: 2000,
            forbidClick: true
          });
          this.$store.commit("changeLoginState", res.data.data.customer.mobile); //储存登录用户的电话（调用接口获取数据要用）
          this.$store.commit("setLoginName", res.data.data.customer.cLoginName); //储存登陆用户的姓名
          this.$store.commit("setTximg", res.data.data.customer.img); //储存登陆用户的头像
          setTimeout(() => {
            this.$router.push("/my");
          }, 2000);
        }
      });
    },
    moveForget() {
      this.$router.push("/forget");
    }
  }
};
</script>
<style scoped>
.login {
  text-align: center;
}
.login > h1 {
  margin-top: 100px;
}
.login > input {
  border: 1px #333 solid;
  padding: 10px;
  border-radius: 20px;
  width: 250px;
  margin-top: 15px;
}
.van-button--normal {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-top: 10px;
  /* font-size: 18px; */
  padding: 0;
}
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
.div {
  font-size: 10px;
}
</style>
