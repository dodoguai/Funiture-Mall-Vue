<template>
  <div>
    <div class="box-card">
      <div><i class="el-icon-tickets"></i> <span>数据列表</span></div>
      <el-button size="mini" @click="changetag(1)">添加</el-button>
    </div>
    <el-table
      v-show="tag == 0"
      :data="tablelist"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
      :row-style="{ height: '180px' }"
    >
      <el-table-column type="index" label="编号"> </el-table-column>
      <el-table-column label="商品图片" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">Huawei P30</span>
          <span style="margin-left: 10px">品牌：</span>
        </template>
      </el-table-column>
      <el-table-column label="价格/货号" width="80">
        <template slot-scope="scope">
          <el-tag size="medium">价格：{{ scope.row.productCount }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="标签" width="180">
        <template slot-scope="scope"
          >上架：
          <el-switch
            v-model="scope.row.navStatus"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
          <br />
          审核：
          <el-switch
            v-model="scope.row.navStatus"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column label="sku库存" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="销量" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handledelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="createnew" v-if="tag == 1">
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-form-item label="分类名称" required prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分类图标" required prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
          <el-select v-model="form.parentId" clearable placeholder="请选择">
            <el-option
              v-for="item in categorylevel1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否显示在导航栏">
          <el-radio-group v-model="form.navStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input type="textarea" v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onsubmit('form')"
            >立即创建</el-button
          >
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="updatenew" v-if="tag == 2">
      <el-form ref="form" :rules="rules" :model="form" label-width="150px">
        <el-form-item label="分类名称" required prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分类图标" required prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="上级分类">
          <el-select v-model="form.parentId" clearable placeholder="请选择">
            <el-option
              v-for="item in categorylevel1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否显示在导航栏">
          <el-radio-group v-model="form.navStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input type="textarea" v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onupdate('form')"
            >立即更新</el-button
          >
          <el-button @click="changetag(0)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        icon: [{ required: true, message: "请输入图片url", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getproductCategory(0, 3);
  },
  components: {},

  computed: {},

  methods: {
    viewafter(id) {
      let _this = this;
      this.$axios({
        method: "get",
        url: "/business/admin/productCategory/list/get-children/" + id,
        data: {},
      }).then((res) => {
        console.log(res);
        _this.tablelist = res.data.content.children;
        console.log(res.data.content.children);
      });
    },
    handlechange(page) {
      console.log(page);
      this.getproductCategory(page, this.pagesize);
    },
    handleEdit(id) {
      let _this = this;
      this.form.id = id;
      this.changetag(2);
      this.$axios({
        method: "get",
        url: "/business/admin/productCategory/getCategoryById/" + id,
        data: {},
      }).then((res) => {
        _this.productinfo = res.data.content;
        console.log(_this.productinfo);
        Object.keys(_this.form).forEach((key) => {
          _this.form[key] = _this.productinfo[key];
        });
      });
    },
    changetag(num) {
      let _this = this;
      this.tag = num;
      this.$axios({
        method: "get",
        url: "/business/admin/productCategory/list/withChildren",
        data: {},
      }).then((res) => {
        console.log(res);
        _this.categorylevel1 = res.data.content;
      });
    },
    getproductCategory(pageindex, pagesize) {
      let param = { page: pageindex, size: pagesize };
      this.$axios({
        method: "post",
        url: "/business/admin/productCategory/list",
        data: param,
      }).then((res) => {
        this.tablelist = res.data.content.list;
      });
    },
    handledelete(proid) {
      let _this = this;
      this.$confirm("此操作将永久删除该商品分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            method: "delete",
            url: "/business/admin/productCategory/delete/" + proid,
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            name: this.form.name,
            icon: this.form.icon,
            keywords: this.form.keywords,
            parentId: this.form.parentId,
            navStatus: this.form.navStatus,
            level: 0,
            productCount: 0,
            sort: this.form.sort,
            id: "",
          };
          console.log(param);
          this.$axios({
            method: "post",
            url: "/business/admin/productCategory/create",
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
    onupdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            name: this.form.name,
            icon: this.form.icon,
            keywords: this.form.keywords,
            parentId: this.form.parentId,
            navStatus: this.form.navStatus,
            level: 0,
            productCount: 0,
            sort: this.form.sort,
            id: this.form.id,
          };
          console.log(param);
          this.$axios({
            method: "post",
            url: "/business/admin/productCategory/update",
            data: param,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "更新成功",
              });
              this.getproductCategory(0, 10);
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

      this.changetag(0);
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
  text-align: left;
}
</style>