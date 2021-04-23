<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">商城后台管理系统</div>
      <el-form
        v-if="tag == 0"
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="请输入用户名">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="param.password"
            @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="imgCode">
          <el-input v-model="param.imgCode" placeholder="请输入验证码">
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
          <img
            class="el-item-img"
            :src="
              'http://127.0.0.1:9001/system/admin/kaptcha/image-code/' + imgCode
            "
            @click="freshImgCode"
            alt=""
          />
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips" style="color: blue">没有账号，现在注册</p>
      </el-form>
      <el-form
        v-if="tag == 1"
        :model="form"
        :rules="rules2"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.email" type="email" placeholder="请输入邮箱">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
         <el-form-item>
          <el-input v-model="form.phone" type="phone" placeholder="请输入手机号">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请再次输入密码"
            v-model="form.password2"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="imgCode">
          <el-input v-model="form.imgCode" placeholder="请输入验证码">
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
          <img
            class="el-item-img"
            :src="
              'http://127.0.0.1:9001/system/admin/kaptcha/image-code/' + imgCode
            "
            @click="freshImgCode"
            alt=""
          />
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="register()">注册</el-button>
        </div>
        
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '../router/request'

export default {
  data: function () {
    return {
      tag: 0,
      picture: {},
      imgCode: "",
      param: {
        imgCode: "",
        username: "",
        password: "",
      },
      form: {
        username: "",
        password: "",
        password2: "",
        email: "",
        imgCode: "",
        imgCodeToken: "",
        phone: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        imgCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        imgCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.freshImgCode();
  },
  methods: {
    test() {
      this.$axios({
        method: "get",
        url: "/system/admin/kaptcha/image-code/" + "happy",
        data: {},
      }).then((res) => {
        this.yanzhengma = res;
        console.log(res);
      });
    },
    register() {
      let param = {
        'username': this.form.username,
        'password': this.form.password,
        'email': this.form.email,
        'imgCode':this.form.imgCode,
        'imageCodeToken':this.imgCode,
        'phone':this.form.phone,
      };
      request[1]({
          method:'post',
          url:'/system/admin/user/register',
          data:param,
      }).then(res=>{
          console.log(res);
      })
    },
    freshImgCode() {
      this.imgCode = Math.random().toString(36).substr(5);
      console.log(this.imgCode);
    },
    submitForm() {
      console.log(this.$store.state.token);
      this.$refs.login.validate((valid) => {
        if (valid) {
          let param = {
          "username": this.param.username,
          "password": this.param.password,
          "imageCode":this.param.imgCode,
          "imageCodeToken":this.imgCode}
          console.log(param)
          //axios Api请求
          this.$axios({
            method: "post",
            url: "/system/admin/user/login",
            data: param,
          })
            .then((response) => {
              if (response.data.success == 0) {
                alert(response.data.message);
              } else {
                this.$message.success("登录成功");
                localStorage.setItem('token',response.data.content.token)
                this.$store.state.token=response.data.content.token;
                this.$store.state.id=response.data.content.id;
                console.log(this.$store.state.token);
                console.log(this.$store.state.id);  
                this.$router.push('/')
              }
              console.log(response);
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error)
              alert("error request");
            });
        } else {
          this.$message.error("请输入账号和密码");
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #055;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.el-item-img {
  width: 110px;
  height: 40px;
  display: inline-block;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
img {
  width: 200px;
  height: 20px;
}
</style>