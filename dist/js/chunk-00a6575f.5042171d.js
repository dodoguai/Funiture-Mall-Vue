(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00a6575f"],{"2ebe":function(t,i,n){"use strict";n("ad5a")},ad5a:function(t,i,n){},d212:function(t,i,n){"use strict";n.r(i);var a=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],attrs:{"infinite-scroll-distance":"0","infinite-scroll-throttle-delay":"500"}},[n("ul",{staticClass:"infinite-list",staticStyle:{overflow:"auto"}},t._l(t.brandslist,(function(i){return n("li",{staticClass:"infinite-list-item",attrs:{"data-brandid":i.id},on:{click:t.openinfo}},[n("img",{attrs:{src:i.logo}}),n("div",{staticClass:"textinfo"},[t._v(t._s(i.name))])])})),0)])},e=[],s={data:function(){return{brandslist:"",pageindex:1,pagesize:3,tag:0}},created:function(){var t=this,i={page:0,size:3};this.$axios({method:"post",url:"/business/admin/brand/list",data:i}).then((function(i){t.brandslist=i.data.content.list}))},components:{},computed:{},methods:{load:function(){var t=this,i={page:++this.pageindex,size:3};1==this.tag||(console.log("这是第"+this.pageindex),this.$axios({method:"post",url:"/business/admin/brand/list",data:i}).then((function(i){if(""==i.data.content.list)console.log("空了"),t.tag=1;else for(var n=0;n<i.data.content.list.length;n++)t.brandslist.push(i.data.content.list[n])})))},openinfo:function(t){var i=t.currentTarget.dataset.brandid;this.$router.push({path:"/brandinfo",query:{brandid:i}})}}},o=s,l=(n("2ebe"),n("2877")),r=Object(l["a"])(o,a,e,!1,null,"fd8201c2",null);i["default"]=r.exports}}]);
//# sourceMappingURL=chunk-00a6575f.5042171d.js.map