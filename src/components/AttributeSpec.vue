<template>
<div>
   <div class="box-card" v-show='tag==0'>
      <div>   <i class="el-icon-tickets"></i>
      <span>数据列表</span></div>
      <el-button size="mini" @click="tag=1">添加</el-button>
   </div>
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
      label="属性名称"
      width="380">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="商品类型"
      width="180">
      <template >
            <el-tag size="medium"> {{parentname}} </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="可选值列表"
      width="300">
      <template slot-scope="scope">    
            <span style="margin-left: 10px">{{ scope.row.value }}</span>
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
  <!-- 创建新商品属性 -->
  <div class="createnew" v-if="tag==1" >
       <el-form ref="form" :rules="rules"  :model="form" label-width="350px" style="margin-left:200px;margin-top:70px">
  <el-form-item label="属性名称" required prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="商品类型" >
     <span style="margin-left: 10px">{{ parentname }}</span>
  </el-form-item>
  <el-form-item label="属性值可选值列表(若有多个以逗号分割)" >
    <el-input type="textarea" v-model="form.value"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onsubmit('form')">立即创建</el-button>
    <el-button @click="tag=0">取消</el-button>
  </el-form-item>
</el-form>
 </div>
 <!-- 更新商品属性的值 -->  
 <div class="updatenew" v-if="tag==2" >
       <el-form ref="form" :rules="rules"  :model="form" label-width="350px" style="margin-left:200px;margin-top:70px">
  <el-form-item label="属性名称" required prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="商品类型" >
     <span style="margin-left: 10px">{{ parentname }}</span>
  </el-form-item>
  <el-form-item label="属性值可选值列表(若有多个以逗号分割)" >
    <el-input type="textarea" v-model="form.value"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onupdate('form')">立即更新</el-button>
    <el-button @click="tag=0">取消</el-button>
  </el-form-item>
</el-form>
 </div>
 <el-pagination
  @current-change='handlechange'
  background
  layout="prev, pager, next"
  :total="100"
  v-show="tag==0"
  >
</el-pagination>       
  </div>
</template>

<script>
export default {
   data () {
      return {
         tablelist:[],
         pageindex:1,
         pagesize:3,
         tag:0,
         parentname:'',
         productinfo:'',//更新分类数据时会用到。
         categorylevel1:[],
         form: {
          id:'',
          name: '',
          icon: '',
          value:'',
          navStatus:1,
          parentId:'',
          sort:0,
          name2:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
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
        this.parentname=this.$route.query.name;
        console.log(this.$route.query)
      this.getproductCategory(0,3);
    },
   components: {},

   computed: {},

   methods: {
      handlespec(id,num){
        console.log(id);
        console.log(num);
         this.$router.push({path:'/attributespec',query:{'id':id,'type':num}}); 
      },
      handlechange(page){
         console.log(page)
         this.pageindex=page;
         this.getproductCategory(page,this.pagesize);
      },
      handleEdit(row){
          console.log(row)
         Object.keys(this.form).forEach(key=>{this.form[key]=row[key]})
         this.tag=2;
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
         let param={'type':this.$route.query.type,'page':pageindex,'size':pagesize,'productAttributeCategoryId':this.$route.query.id}
         this.$axios({
        method:'post',
        url:'/business/admin/productAttribute/list',
        data:param, 
      }).then(res=>{
          console.log(res)
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
              url:'/business/admin/productAttribute/delete/'+proid,
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
          let newvalue=this.form.value;
          newvalue=newvalue.replace(/，/g,',');
          let param={'spuId':'', 'name':this.form.name,'type':this.$route.query.type,'productAttributeCategoryId':this.$route.query.id,'value':newvalue}
          console.log(param)
          this.$refs[formName].validate((valid) => {
            if (valid) {
         this.$axios({
          method:'post',
          url:'/business/admin/productAttribute/create',
          data:param,
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
        
      },
      onupdate(formName){
          let _this=this;
          let newvalue=this.form.value;
          newvalue=newvalue.replace(/，/g,',');
          let param={'id':this.form.id ,'spuId':'', 'name':this.form.name,'type':this.$route.query.type,'productAttributeCategoryId':this.$route.query.id,'value':newvalue}
                 
         this.$refs[formName].validate((valid) => {
            if (valid) {
         this.$axios({
          method:'post',
          url:'/business/admin/productAttribute/update',
          data:param,
       }).then(res=>{
          if(res.data.code==200){ this.$message({
             type:'success',
             message:'更新成功'
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
.createnew,
.updatenew{
   padding: 0,15%;
   width: 70%;
}
.el-form-item{
   text-align: left;
}
</style>