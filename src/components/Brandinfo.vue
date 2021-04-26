<template>
  <div>
    <img :src="brandinfo.logo" class='brandlogo' />
    <div class="textinfo">{{ brandinfo.name }}</div>
    <el-button type="primary" @click="createnew">创建新品牌</el-button>
    <el-button type="primary" @click="updatenew">更新品牌信息</el-button>
    <el-button type="danger" @click="open">删除此品牌</el-button>
    <div class="createnew" v-if="tag == 1">
      <div class="tiptext">带*号的为必填项</div>
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-form-item label="品牌名称" required prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo(url)" required prop="logo">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <div class="uploadimgbox">
              <img v-if="form.logo" :src="form.logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌描述">
          <el-input type="textarea" v-model="form.brandStory"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')"
            >立即创建</el-button
          >
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="updatenew" v-if="tag == 2">
      <!-- <div class='tiptext'>带*号的为必填项</div> -->
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="品牌名称" required prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo(url)" required prop="logo">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <div class="uploadimgbox">
              <img v-if="form.logo" :src="form.logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="form.showStatus"></el-switch>
        </el-form-item>
        <el-form-item label="品牌描述">
          <el-input type="textarea" v-model="form.brandStory"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.productCount"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onUpdate('form')"
            >立即更新</el-button
          >
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: 0,
      brandinfo: "",
      form: {
        name: "",
        logo: "",
        brandStory: "",
        pics: "",
        productCount: 0,
        showStatus: 0,
        sort: 0,
      },
      rules: {
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        logo: [{ required: true, message: "请输入图片url", trigger: "blur" }],
      },
    };
  },

  components: {},

  computed: {},
  created() {
    let _this = this;
    console.log(this.$route.query.brandid);
    this.$axios({
      method: "get",
      headers: {
        token: this.$store.state.token,
      },
      url: "/business/admin/brand/search/" + _this.$route.query.brandid,
      data: {},
    }).then((res) => {
      console.log(res);
      _this.brandinfo = res.data.content;
    });
  },
  methods: {
    beforeAvatarUpload(file){
        console.log(this.imageUrl)
        let _this=this;
        let formdata=new FormData();
        formdata.append('use',2),
        formdata.append('file',file)
        console.log(file)
        this.$axios({
         method:'post',
         url:'/file/oss/upload',
         data:formdata,
        }).then(res=>{
          this.form.logo=res.data.content.filePath;
        })
        return false
      },
    createnew() {
      this.tag = 1;
    },
    updatenew() {
      let _this = this;
      Object.keys(_this.form).forEach((key) => {
        _this.form[key] = _this.brandinfo[key];
      });
      this.form.showStatus = !Boolean(this.brandinfo.showStatus);
      this.tag = 2;
    },
    open() {
      let _this = this;
      this.$confirm("此操作将永久删除该品牌, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            headers: {
              token: this.$store.state.token,
            },
            method: "delete",
            url: "/business/admin/brand/delete/" + _this.$route.query.brandid,
            data: {},
          }).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!正在跳转到品牌管理界面",
            });
            this.$router.push({ path: "/brands" });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onSubmit: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            name: this.form.name,
            logo: this.form.logo,
            brandStory: this.form.brandStory,
            pics: this.form.pics,
            productCount: this.form.productCount,
            sort: this.form.sort,
            showStatus: this.form.showStatus,
          };
          this.$axios({
            headers: {
              token: this.$store.state.token,
            },
            method: "post",
            url: "/business/admin/brand/create",
            data: param,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
            } else {
              this.$message({
                type: "info",
                message: res.data.message,
              });
            }
          });
        } else {
          alert("输入有错，请检查");
          return false;
        }
      });
    },
    onUpdate: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          alert("输入有错，请检查");
          return false;
        }
      });
      console.log(this.form.showStatus);
      let param = {
        id: this.$route.query.brandid,
        name: this.form.name,
        logo: this.form.logo,
        brandStory: this.form.brandStory,
        pics: this.form.pics,
        productCount: this.form.productCount,
        sort: this.form.sort,
        showStatus: !this.form.showStatus - 0,
      };
      this.$axios({
        headers: {
          token: this.$store.state.token,
        },
        method: "post",
        url: "/business/admin/brand/update",
        data: param,
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "更新成功",
          });
        } else {
          this.$message({
            type: "info",
            message: res.data.message,
          });
        }
      });
    },
  },
};
</script>
<style lang='css' scoped>
.el-switch {
  left: -500px !important;
}
.brandlogo{
 width: 80%;
 height:80% ;
}
</style>