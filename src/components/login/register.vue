<template>
  <div class="login">
    <van-nav-bar left-text="注册" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-field
        v-model="cLoginName"
        required
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('用户名可以是文字特殊符号结合')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password1"
        type="password"
        label="确认密码"
        placeholder="请确认密码"
        required
      />
      <van-field
        v-model="mobile"
        label="手机号码"
        placeholder="请输入11位手机号码"
        required
      />
      <van-field
        v-model="email"
        type="email"
        label="邮箱"
        placeholder="邮箱"
        required
      />
    </van-cell-group>

    <van-radio-group v-model="radio" class="radio">
      <van-radio name="1">男</van-radio>
      <van-radio name="2">女</van-radio>
    </van-radio-group>
    <h5>上传头像</h5>
    <van-uploader
      multiple
      :after-read="afterRead"
      v-model="fileList"
      :max-count="1"
    />
    <br />
    <van-button type="info" @click="register">注册</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "2",
      fileList: [],
      cLoginName: "",
      password: "",
      password1: "",
      mobile: "",
      img: "",
      email: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    register() {
      var flag = false;
      if (this.cLoginName == "") {
        this.$notify("用户名不能为空");
        return;
      }
      if (this.mobile.length != 11) {
        this.$notify("手机号码格式不正确");
        return;
      }
      if (this.password.length < 6) {
        this.$notify("密码不能小于六位");
        return;
      }
      if (this.password1 != this.password) {
        this.$notify("两次密码不一致");
        return;
      }
      if (this.cLoginName != "") {
        if (this.password != "" && this.mobile != "") {
          flag = true;
        }
      }
      if (flag === true) {
        var customer = {
          cLoginName: this.cLoginName,
          password: this.password,
          mobile: this.mobile,
          img: this.img,
          sex: this.radio === "1" ? "男" : "女",
          email: this.email
        };
        this.$http.post("/shop/register", customer).then(res => {
          console.log(res.data);
          if (res.data.code == null) {
            this.$notify("用户名或手机号码已存在");
          } else if (res.data.code == 200) {
            this.$toast({
              message: "注册成功  >>  跳转登陆页面",
              iocn: "success",
              duration: 3000,
              forbidClick: true
            });
            setTimeout(() => {
              this.$router.push("/login");
            }, 3000);
          }
        });
      }
    },
    afterRead(flie) {
      var data = new FormData();
      data.append("file", flie.file);
      this.$http
        .post("/shop/uploadFile", data, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          this.$store.commit("setTximg", res.data.data);
          this.img = res.data.data;
        });
    }
  }
};
</script>
<style scoped>
.red {
  box-shadow: 0 0 5px 0 red;
}
.radio {
  display: flex;
  justify-content: space-between;
  padding: 20px 100px;
}
.login {
  text-align: center;
}
.login > h1 {
  margin-top: 100px;
}
.login > .input {
  border: 1px #333 solid;
  padding: 10px;
  border-radius: 20px;
  width: 250px;
  margin-top: 15px;
}
.login > .sex {
  margin: 10px;
}
.login > h5 {
  margin: 10px;
}
.van-button--normal {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-top: 10px;
  /* font-size: 16px; */
  padding: 0;
}
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: black;
}
</style>
