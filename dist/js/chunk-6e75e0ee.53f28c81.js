(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e75e0ee"],{a20f:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"box-card"},[e._m(0),n("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialogFormVisible=!0}}},[e._v("添加")])],1),n("el-dialog",{attrs:{title:"添加类型",visible:e.dialogFormVisible,width:"550px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[n("el-form-item",{attrs:{label:"类型名称","label-width":"120px",required:"",prop:"name"}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",[n("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onsubmit("form")}}},[e._v("确 定")])],1)],1)],1),n("el-dialog",{attrs:{title:"编辑类型",visible:e.dialogFormVisible2,width:"550px"},on:{"update:visible":function(t){e.dialogFormVisible2=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[n("el-form-item",{attrs:{label:"类型名称","label-width":"120px",required:"",prop:"name2"}},[n("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name2,callback:function(t){e.$set(e.form,"name2",t)},expression:"form.name2"}})],1),n("el-form-item",[n("el-button",{on:{click:function(t){e.dialogFormVisible2=!1}}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onupdate("form")}}},[e._v("确 定")])],1)],1)],1),n("el-table",{directives:[{name:"show",rawName:"v-show",value:0==e.tag,expression:"tag == 0"}],staticStyle:{width:"100%"},attrs:{data:e.tablelist,"header-cell-style":{"text-align":"center"},"cell-style":{"text-align":"center"}}},[n("el-table-column",{attrs:{type:"index",label:"编号"}}),n("el-table-column",{attrs:{label:"类型名称",width:"380"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.name))])]}}])}),n("el-table-column",{attrs:{label:"属性数量",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.specCount))])]}}])}),n("el-table-column",{attrs:{label:"参数数量",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-tag",{attrs:{size:"medium"}},[e._v(e._s(t.row.paramCount))])]}}])}),n("el-table-column",{attrs:{label:"设置"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handlespec(t.row.id,0,t.row.name)}}},[e._v("属性列表")]),n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handlespec(t.row.id,1,t.row.name)}}},[e._v("参数列表")])]}}])}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini"},on:{click:function(n){return e.handleEdit(t.row)}}},[e._v("编辑")]),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handledelete(t.row.id)}}},[e._v("删除")])]}}])})],1),n("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:100},on:{"current-change":e.handlechange}})],1)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("i",{staticClass:"el-icon-tickets"}),e._v(" "),n("span",[e._v("数据列表")])])}],o=(n("b0c0"),{data:function(){return{dialogFormVisible:!1,dialogFormVisible2:!1,tablelist:[],pageindex:1,pagesize:3,tag:0,productinfo:"",categorylevel1:[],form:{id:"",name:"",icon:"",keywords:"",navStatus:1,parentId:"",sort:0,name2:""},rules:{name:[{required:!0,message:"请输入类型名称",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}],name2:[{required:!0,message:"请输入类型名称",trigger:"blur"},{min:1,max:15,message:"长度在 1 到 15 个字符",trigger:"blur"}]}}},created:function(){this.getproductCategory(0,3)},components:{},computed:{},methods:{handlespec:function(e,t,n){console.log(e),console.log(t),this.$router.push({path:"/attributespec",query:{id:e,type:t,name:n}})},handlechange:function(e){console.log(e),this.pageindex=e,this.getproductCategory(e,this.pagesize)},handleEdit:function(e){this.form.name2=e.name,this.form.id=e.id,this.dialogFormVisible2=!0},getproductCategory:function(e,t){var n=this,a={page:e,size:t};this.$axios({method:"post",url:"/business/admin/productAttributeCategory/list",data:a}).then((function(e){n.tablelist=e.data.content.list}))},handledelete:function(e){var t=this;this.$confirm("此操作将永久删除该商品分类, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$axios({method:"delete",url:"/business/admin/productAttributeCategory/delete/"+e,data:{}}).then((function(e){console.log(e),t.$message({type:"success",message:"删除成功!"}),t.getproductCategory(0,10)}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},onsubmit:function(e){var t=this,n=new FormData;n.append("name",this.form.name),this.$refs[e].validate((function(e){if(!e)return alert("输入有错，请检查"),!1;t.$axios({method:"post",url:"/business/admin/productAttributeCategory/create",data:n}).then((function(e){200==e.data.code?(t.$message({type:"success",message:"创建成功"}),t.getproductCategory(t.pageindex,t.pagesize)):t.$message({type:"info",message:e.data.message})}))})),this.dialogFormVisible=!1},onupdate:function(e){var t=this,n=new FormData;n.append("name",this.form.name2),this.$refs[e].validate((function(e){if(!e)return alert("输入有错，请检查"),!1;t.$axios({method:"post",url:"/business/admin/productAttributeCategory/update/"+t.form.id,data:n}).then((function(e){200==e.data.code?(t.$message({type:"success",message:"更新成功"}),t.dialogFormVisible2=!1,t.getproductCategory(t.pageindex,t.pagesize)):t.$message({type:"info",message:e.data.message})}))}))}}}),r=o,s=(n("eb08"),n("2877")),l=Object(s["a"])(r,a,i,!1,null,"18ee1ce4",null);t["default"]=l.exports},b0c0:function(e,t,n){var a=n("83ab"),i=n("9bf2").f,o=Function.prototype,r=o.toString,s=/^\s*function ([^ (]*)/,l="name";a&&!(l in o)&&i(o,l,{configurable:!0,get:function(){try{return r.call(this).match(s)[1]}catch(e){return""}}})},bf24:function(e,t,n){},eb08:function(e,t,n){"use strict";n("bf24")}}]);
//# sourceMappingURL=chunk-6e75e0ee.53f28c81.js.map