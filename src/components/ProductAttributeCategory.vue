<template>
<div>
   <div class="box-card">
      <div>   <i class="el-icon-tickets"></i>
      <span>数据列表</span></div>
      <el-button size="mini" @click="dialogFormVisible=true">添加</el-button>
   </div>
   <el-dialog title="添加类型" :visible.sync="dialogFormVisible" width="550px">
       <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="类型名称" label-width="120px" required prop="name">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>  
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onsubmit('form')">确 定</el-button>
  </el-form-item>
  </el-form>
</el-dialog>
 <el-dialog title="编辑类型" :visible.sync="dialogFormVisible2" width="550px">
       <el-form :model="form" :rules="rules" ref="form">
    <el-form-item label="类型名称" label-width="120px" required prop="name2">
      <el-input v-model="form.name2" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>  
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="onupdate('form')">确 定</el-button>
  </el-form-item>
  </el-form>
  
</el-dialog>
    <el-table
    v-show='tag==0'
    :data='tablelist'
    :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}"
    style="width: 100%">
    <el-table-column
      type=index
      label='编号'
      >
    </el-table-column>
    <el-table-column
      label="类型名称"
      width="380">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="属性数量"
      width="180">
      <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.specCount }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="参数数量"
      width="100">
      <template slot-scope="scope">    
            <el-tag size="medium">{{ scope.row.paramCount }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="设置"
     >
       <template  slot-scope="scope">
        <el-button size="mini" @click="handlespec(scope.row.id,0,scope.row.name)">属性列表</el-button>
        <el-button size="mini" @click="handlespec(scope.row.id,1,scope.row.name)" >参数列表</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button 
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handledelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="createnew" v-if="tag==1" >
       <el-form ref="form" :rules="rules"  :model="form" label-width="150px">
  <el-form-item label="分类名称" required prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="分类图标" required prop="icon">
    <el-input v-model="form.icon"></el-input>
  </el-form-item>
  <el-form-item label="上级分类" >
    <el-select v-model="form.parentId" clearable placeholder="请选择">
    <el-option
      v-for="item in categorylevel1"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="排序" >
    <el-input  v-model="form.sort "></el-input>
  </el-form-item>
  <el-form-item label="是否显示在导航栏" >
     <el-radio-group v-model="form.navStatus" >
       <el-radio :label="1">是</el-radio>
       <el-radio :label="0">否</el-radio>
     </el-radio-group>
  </el-form-item>
  <el-form-item label="关键词" >
    <el-input type="textarea" v-model="form.keywords "></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onsubmit('form')">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
 </div>  
 <div class="updatenew" v-if="tag==2" >
       <el-form ref="form" :rules="rules"  :model="form" label-width="150px">
  <el-form-item label="分类名称" required prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="分类图标" required prop="icon">
    <el-input v-model="form.icon"></el-input>
  </el-form-item>
  <el-form-item label="上级分类" >
    <el-select v-model="form.parentId" clearable placeholder="请选择">
    <el-option
      v-for="item in categorylevel1"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="排序" >
    <el-input  v-model="form.sort "></el-input>
  </el-form-item>
  <el-form-item label="是否显示在导航栏" >
     <el-radio-group v-model="form.navStatus" >
       <el-radio :label="1">是</el-radio>
       <el-radio :label="0">否</el-radio>
     </el-radio-group>
  </el-form-item>
  <el-form-item label="关键词" >
    <el-input type="textarea" v-model="form.keywords "></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onupdate('form')">立即更新</el-button>
    <el-button @click="changetag(0)">取消</el-button>
  </el-form-item>
</el-form>
 </div>
 <el-pagination
  @current-change='handlechange'
  background
  layout="prev, pager, next"
  :total="100"
  >
</el-pagination>       
  </div>
</template>

<script>
export default {
   data () {
      return {
         dialogFormVisible: false,
         dialogFormVisible2: false,
         tablelist:[],
         pageindex:1,
         pagesize:3,
         tag:0,
         productinfo:'',//更新分类数据时会用到。
         categorylevel1:[],
         form: {
          id:'',
          name: '',
          icon: '',
          keywords:'',
          navStatus:1,
          parentId:'',
          sort:0,
          name2:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          name2: [
            { required: true, message: '请输入类型名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
        },
      };
   },
    created() {
      this.getproductCategory(0,3);
    },
   components: {},

   computed: {},

   methods: {
      handlespec(id,num,name){
        console.log(id);
        console.log(num);
         this.$router.push({path:'/attributespec',query:{'id':id,'type':num,'name':name}}); 
      },
      handlechange(page){
         console.log(page)
         this.pageindex=page;
         this.getproductCategory(page,this.pagesize);
      },
      handleEdit(row){
         this.form.name2=row.name;
         this.form.id=row.id;
         this.dialogFormVisible2=true;
      },
      changetag(num){
         let _this=this;
         this.tag=num;
            this.$axios({
               method:'get',
               url:'/business/admin/productCategory/list/withChildren',
               data:{},
            }).then(res=>{
               console.log(res)
               _this.categorylevel1=res.data.content
               })
         
      },
       getproductCategory(pageindex,pagesize){
         let param={'page':pageindex,'size':pagesize}
         this.$axios({
        method:'post',
        url:'/business/admin/productAttributeCategory/list',
        data:param, 
      }).then(res=>{
          this.tablelist=res.data.content.list;
      })
       },
       handledelete(proid) {
         let _this=this;
        this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$axios({
              method:'delete',
              url:'/business/admin/productAttributeCategory/delete/'+proid,
              data:{}
           }).then(res=>{
              console.log(res)
                this.$message({
            type: 'success',
            message: '删除成功!'
          });
         this.getproductCategory(0,10);
           })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      } ,
      onsubmit(formName){
         let _this=this;
          let formdata=new FormData();
          formdata.append('name',this.form.name);
         this.$refs[formName].validate((valid) => {
            if (valid) {
         this.$axios({
          method:'post',
          url:'/business/admin/productAttributeCategory/create',
          data:formdata,
       }).then(res=>{
          if(res.data.code==200){ this.$message({
             type:'success',
             message:'创建成功'
          })
          _this.getproductCategory(this.pageindex,this.pagesize);}else{
this.$message({
             type:'info',
             message:res.data.message,
          })
          }
       })
          } else {
            alert('输入有错，请检查');
            return false;
          }
        });
        this.dialogFormVisible=false;
      },
      onupdate(formName){
          let _this=this;
           let formdata=new FormData();
          formdata.append('name',this.form.name2);
         this.$refs[formName].validate((valid) => {
            if (valid) {
         this.$axios({
          method:'post',
          url:'/business/admin/productAttributeCategory/update/'+this.form.id,
          data:formdata,
       }).then(res=>{
          if(res.data.code==200){ this.$message({
             type:'success',
             message:'更新成功'
          })
             _this.dialogFormVisible2=false;
             _this.getproductCategory(this.pageindex,this.pagesize);}else{
this.$message({
             type:'info',
             message:res.data.message,
          })
          }
       })
          } else {
            alert('输入有错，请检查');
            return false;
          }
        });
        
      },
   }
}
</script>
<style lang='css' scoped>
.box-card {
   padding: 20px;
   display:flex;
   justify-content: space-between;
}
.createnew{
   padding: 0,15%;
   width: 70%;
}
.el-form-item{
   text-align: center;
}
</style>