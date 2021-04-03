<template>
   <div v-infinite-scroll="load" infinite-scroll-distance="0" infinite-scroll-throttle-delay="500" >
    <ul class="infinite-list"  style="overflow:auto; ">
       <li v-for="item in brandslist"  class="infinite-list-item" @click="openinfo" :data-brandid=item.id>
        <img :src='item.logo' >
        <div class="textinfo">{{item.name}}</div>
       </li>
    </ul>
   </div>
</template>
<script>
export default {
   data () {
      return {
         brandslist:'',
         pageindex:1,
         pagesize:3,
         tag:0,
      };
   },
   created() {
      let param={'page':0,'size':3}
      this.$axios({
        method:'post',
        url:'/business/admin/brand/list',
        data:param, 
      }).then(res=>{
          this.brandslist=res.data.content.list;
      })
    } ,
    
   components: {},

   computed: {},
   
   methods: {
       load:function(){
        
        let param={'page':++this.pageindex,'size':3}
        if(this.tag==1){}else{console.log('这是第'+this.pageindex);
             this.$axios({
        method:'post',
        url:'/business/admin/brand/list',
        data:param, 
      }).then(res=>{
          if(res.data.content.list==''){console.log('空了');this.tag=1;
          }
          else
          {   for(let i=0;i<res.data.content.list.length;i++){
              this.brandslist.push(res.data.content.list[i])
          }
}  
      })
        }
       
       },
       openinfo: function(e){
           var brandid=e.currentTarget.dataset.brandid;
           this.$router.push({path:'/brandinfo',query:{'brandid':brandid}}); 
       }

   }
}
</script>
<style lang='css' scoped>
.infinite-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
}
.infinite-list-item{
    overflow: hidden;
    text-align: center;
    height: 350px;
    width: 33%;
    min-width: 33%;
    max-width: 33%;
}
.infinite-list-item img{
   width: 80%;
   overflow:hidden;
   height: 80%;
}
.textinfo{
    width: 100%;
}
</style>