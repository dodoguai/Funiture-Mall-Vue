(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31d5e2ab"],{"159b":function(t,e,o){var r=o("da84"),n=o("fdbc"),a=o("17c2"),s=o("9112");for(var i in n){var u=r[i],c=u&&u.prototype;if(c&&c.forEach!==a)try{s(c,"forEach",a)}catch(l){c.forEach=a}}},"17c2":function(t,e,o){"use strict";var r=o("b727").forEach,n=o("a640"),a=n("forEach");t.exports=a?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"65f0":function(t,e,o){var r=o("861d"),n=o("e8b5"),a=o("b622"),s=a("species");t.exports=function(t,e){var o;return n(t)&&(o=t.constructor,"function"!=typeof o||o!==Array&&!n(o.prototype)?r(o)&&(o=o[s],null===o&&(o=void 0)):o=void 0),new(void 0===o?Array:o)(0===e?0:e)}},a640:function(t,e,o){"use strict";var r=o("d039");t.exports=function(t,e){var o=[][t];return!!o&&r((function(){o.call(null,e||function(){throw 1},1)}))}},b0c0:function(t,e,o){var r=o("83ab"),n=o("9bf2").f,a=Function.prototype,s=a.toString,i=/^\s*function ([^ (]*)/,u="name";r&&!(u in a)&&n(a,u,{configurable:!0,get:function(){try{return s.call(this).match(i)[1]}catch(t){return""}}})},b437:function(t,e,o){},b64b:function(t,e,o){var r=o("23e7"),n=o("7b0b"),a=o("df75"),s=o("d039"),i=s((function(){a(1)}));r({target:"Object",stat:!0,forced:i},{keys:function(t){return a(n(t))}})},b727:function(t,e,o){var r=o("0366"),n=o("44ad"),a=o("7b0b"),s=o("50c4"),i=o("65f0"),u=[].push,c=function(t){var e=1==t,o=2==t,c=3==t,l=4==t,f=6==t,m=7==t,d=5==t||f;return function(p,b,h,g){for(var v,y,w=a(p),x=n(w),$=r(b,h,3),S=s(x.length),k=0,_=g||i,C=e?_(p,S):o||m?_(p,0):void 0;S>k;k++)if((d||k in x)&&(v=x[k],y=$(v,k,w),t))if(e)C[k]=y;else if(y)switch(t){case 3:return!0;case 5:return v;case 6:return k;case 2:u.call(C,v)}else switch(t){case 4:return!1;case 7:u.call(C,v)}return f?-1:c||l?l:C}};t.exports={forEach:c(0),map:c(1),filter:c(2),some:c(3),every:c(4),find:c(5),findIndex:c(6),filterOut:c(7)}},e7e7:function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("img",{attrs:{src:t.brandinfo.logo}}),o("div",{staticClass:"textinfo"},[t._v(t._s(t.brandinfo.name))]),o("el-button",{attrs:{type:"primary"},on:{click:t.createnew}},[t._v("创建新品牌")]),o("el-button",{attrs:{type:"primary"},on:{click:t.updatenew}},[t._v("更新品牌信息")]),o("el-button",{attrs:{type:"danger"},on:{click:t.open}},[t._v("删除此品牌")]),1==t.tag?o("div",{staticClass:"createnew"},[o("div",{staticClass:"tiptext"},[t._v("带*号的为必填项")]),o("el-form",{ref:"form",attrs:{rules:t.rules,model:t.form,"label-width":"150px"}},[o("el-form-item",{attrs:{label:"品牌名称",required:"",prop:"name"}},[o("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),o("el-form-item",{attrs:{label:"品牌logo(url)",prop:"logo",required:""}},[o("el-input",{model:{value:t.form.logo,callback:function(e){t.$set(t.form,"logo",e)},expression:"form.logo"}})],1),o("el-form-item",{attrs:{label:"品牌描述"}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.form.brandStory,callback:function(e){t.$set(t.form,"brandStory",e)},expression:"form.brandStory"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onSubmit("form")}}},[t._v("立即创建")]),o("el-button",[t._v("取消")])],1)],1)],1):t._e(),2==t.tag?o("div",{staticClass:"updatenew"},[o("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"150px"}},[o("el-form-item",{attrs:{label:"品牌名称",required:"",prop:"name"}},[o("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),o("el-form-item",{attrs:{label:"品牌logo(url)",required:"",prop:"logo"}},[o("el-input",{model:{value:t.form.logo,callback:function(e){t.$set(t.form,"logo",e)},expression:"form.logo"}})],1),o("el-form-item",{attrs:{label:"是否显示"}},[o("el-switch",{model:{value:t.form.showStatus,callback:function(e){t.$set(t.form,"showStatus",e)},expression:"form.showStatus"}})],1),o("el-form-item",{attrs:{label:"品牌描述"}},[o("el-input",{attrs:{type:"textarea"},model:{value:t.form.brandStory,callback:function(e){t.$set(t.form,"brandStory",e)},expression:"form.brandStory"}})],1),o("el-form-item",{attrs:{label:"商品数量"}},[o("el-input",{model:{value:t.form.productCount,callback:function(e){t.$set(t.form,"productCount",e)},expression:"form.productCount"}})],1),o("el-form-item",{attrs:{label:"排序"}},[o("el-input",{model:{value:t.form.sort,callback:function(e){t.$set(t.form,"sort",e)},expression:"form.sort"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.onUpdate("form")}}},[t._v("立即更新")]),o("el-button",[t._v("取消")])],1)],1)],1):t._e()],1)},n=[],a=(o("159b"),o("b64b"),o("b0c0"),{data:function(){return{tag:0,brandinfo:"",form:{name:"",logo:"",brandStory:"",pics:"",productCount:0,showStatus:0,sort:0},rules:{name:[{required:!0,message:"请输入品牌名称",trigger:"blur"},{min:3,max:15,message:"长度在 3 到 15 个字符",trigger:"blur"}],logo:[{required:!0,message:"请输入图片url",trigger:"blur"}]}}},components:{},computed:{},created:function(){var t=this;console.log(this.$route.query.brandid),this.$axios({method:"get",url:"/business/admin/brand/"+t.$route.query.brandid,data:{}}).then((function(e){console.log(e),t.brandinfo=e.data.content}))},methods:{createnew:function(){this.tag=1},updatenew:function(){var t=this;Object.keys(t.form).forEach((function(e){t.form[e]=t.brandinfo[e]})),this.form.showStatus=!Boolean(this.brandinfo.showStatus),this.tag=2},open:function(){var t=this,e=this;this.$confirm("此操作将永久删除该品牌, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$axios({method:"delete",url:"/business/admin/brand/delete/"+e.$route.query.brandid,data:{}}).then((function(e){console.log(e),t.$message({type:"success",message:"删除成功!正在跳转到品牌管理界面"}),t.$router.push({path:"/brands"})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},onSubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return alert("输入有错，请检查"),!1;var o={name:e.form.name,logo:e.form.logo,brandStory:e.form.brandStory,pics:e.form.pics,productCount:e.form.productCount,sort:e.form.sort,showStatus:e.form.showStatus};e.$axios({method:"post",url:"/business/admin/brand/create",data:o}).then((function(t){console.log(t),200==t.data.code?e.$message({type:"success",message:"创建成功"}):e.$message({type:"info",message:t.data.message})}))}))},onUpdate:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return alert("输入有错，请检查"),!1})),console.log(this.form.showStatus);var o={id:this.$route.query.brandid,name:this.form.name,logo:this.form.logo,brandStory:this.form.brandStory,pics:this.form.pics,productCount:this.form.productCount,sort:this.form.sort,showStatus:!this.form.showStatus-0};this.$axios({method:"post",url:"/business/admin/brand/update",data:o}).then((function(t){console.log(t),200==t.data.code?e.$message({type:"success",message:"更新成功"}):e.$message({type:"info",message:t.data.message})}))}}}),s=a,i=(o("ee1d"),o("2877")),u=Object(i["a"])(s,r,n,!1,null,"350516ff",null);e["default"]=u.exports},e8b5:function(t,e,o){var r=o("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},ee1d:function(t,e,o){"use strict";o("b437")}}]);
//# sourceMappingURL=chunk-31d5e2ab.743a0612.js.map