<template>

  <div class="block">
    
 <el-checkbox-group v-model="form.type">
     <el-checkbox label="1" name="type">用人单保障规章制度情况</el-checkbox>
     <el-checkbox label="7" name="type">用人单用童工规定情况</el-checkbox>
     <el-checkbox label="3" name="type">用人单或者解除劳动合同情况</el-checkbox>
     <el-checkbox label="4" name="type">用人单位成年工特殊劳动保障规定的情况</el-checkbox>
     <el-checkbox label="5" name="type">用人单休息休假规定情况</el-checkbox>
 </el-checkbox-group>

    
    <el-button @click="test"></el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form:{
        type:[]
      },
      newform: {
        list1: ["apple", "xiaomi", "ios", "android"],
        list2: ["颜色", "长度", "宽度"],
      },
      value: [],
      speclist:[],
      paramlist:[],
      arrtributecategory:[],
      options: [],
    };
  },
  created() {
    let param = { page: 0, size: 99 };
        this.$axios({
          headers: {
            token: this.$store.state.token,
          },
          method: "post",
          url: "/business/admin/productAttributeCategory/list",
          data: param,
        }).then((res) => {
          this.arrtributecategory = res.data.content.list;
          console.log(res.data.content.list);
        });
        
  },
  methods: {
    attributeChange(value) {
      this.speclist = [];
      this.paramlist = [];
      this.form=[];
      this.$axios({
        headers: {
          token: this.$store.state.token,
        },
        method: "get",
        url:
          "/business/admin/productAttributeCategory/list/withAttr/" +
          value +
          "?type=2",
        data: {},
      }).then((res) => {
        if (res.data.content.productAttributeList != "") {
          let tmp = res.data.content.productAttributeList;
          for (let i = 0; i < tmp.length; i++) {
            if (tmp[i].type == 0) {
              this.speclist.push(tmp[i]);
            } else {
              this.paramlist.push(tmp[i]);
            }
          }
        }
        
      });
      console.log('here')
      console.log(this.form)
    },
    test() {
      console.log(this.form);
    },
    handleChange(value) {
      console.log(value[value.length - 1]);
    },
  },
};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.uploadimgbox {
  background-color: pink;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.uploadimgbox img {
  width: 100%;
  height: 100%;
}
</style>