<template>
  <div>
    <div class="box-card">
      <div><i class="el-icon-tickets"></i> <span>数据列表</span></div>
      <el-button size="mini" @click="dialogFormVisible = true">添加</el-button>
    </div>
    <el-dialog title="添加类型" :visible.sync="dialogFormVisible" width="550px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="类型名称" label-width="120px" required prop="name">
          <el-input v-model="form.name" autocomplete="off" @keyup.enter.native="onsubmit('form')" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onsubmit('form')" >确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="编辑类型"
      :visible.sync="dialogFormVisible2"
      width="550px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="类型名称"
          label-width="120px"
          required
          prop="name2"
        >
          <el-input v-model="form.name2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="onupdate('form')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table
      v-show="tag == 0"
      :data="tablelist"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
    >
      <el-table-column type="index" label="编号"> </el-table-column>
      <el-table-column label="类型名称" width="380">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="属性数量" width="180">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.specCount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="参数数量" width="100">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.paramCount }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="设置">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handlespec(scope.row.id, 0, scope.row.name)"
            >属性列表</el-button
          >
          <el-button
            size="mini"
            @click="handlespec(scope.row.id, 1, scope.row.name)"
            >参数列表</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handledelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handlechange"
      background
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      tablelist: [],
      pageindex: 1,
      pagesize: 3,
      tag: 0,
      productinfo: "", //更新分类数据时会用到。
      categorylevel1: [],
      form: {
        id: "",
        name: "",
        icon: "",
        keywords: "",
        navStatus: 1,
        parentId: "",
        sort: 0,
        name2: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        name2: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getproductCategory(0, 3);
  },
  components: {},

  computed: {},

  methods: {
    handlespec(id, num, name) {
      console.log(id);
      console.log(num);
      this.$router.push({
        path: "/attributespec",
        query: { id: id, type: num, name: name },
      });
    },
    handlechange(page) {
      console.log(page);
      this.pageindex = page;
      this.getproductCategory(page, this.pagesize);
    },
    handleEdit(row) {
      this.form.name2 = row.name;
      this.form.id = row.id;
      this.dialogFormVisible2 = true;
    },

    getproductCategory(pageindex, pagesize) {
      let param = { page: pageindex, size: pagesize };
      this.$axios({
        headers: {
          token: this.$store.state.token,
        },
        method: "post",
        url: "/business/admin/productAttributeCategory/list",
        data: param,
      }).then((res) => {
        this.tablelist = res.data.content.list;
      });
    },
    handledelete(proid) {
      this.$confirm("此操作将永久删除该商品分类, 是否继续?", "提示", {
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
            url: "/business/admin/productAttributeCategory/delete/" + proid,
            data: {},
          }).then((res) => {
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getproductCategory(0, 10);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onsubmit(formName) {
      let formdata = new FormData();
      formdata.append("name", this.form.name);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            headers: {
              token: this.$store.state.token,
            },
            method: "post",
            url: "/business/admin/productAttributeCategory/create",
            data: formdata,
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
              this.getproductCategory(this.pageindex, this.pagesize);
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
      this.dialogFormVisible = false;
    },
    onupdate(formName) {
      let formdata = new FormData();
      formdata.append("name", this.form.name2);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            headers: {
              token: this.$store.state.token,
            },
            method: "post",
            url:
              "/business/admin/productAttributeCategory/update/" + this.form.id,
            data: formdata,
          }).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "更新成功",
              });
              this.dialogFormVisible2 = false;
              this.getproductCategory(this.pageindex, this.pagesize);
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
  },
};
</script>
<style lang='css' scoped>
.box-card {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.createnew {
  padding: 0, 15%;
  width: 70%;
}
.el-form-item {
  text-align: center;
}
</style>