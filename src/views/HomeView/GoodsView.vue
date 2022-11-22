<template>
    <div>
        <!-- 搜索 -->
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="商品：">
              <el-input v-model="name" placeholder="Approved by" />
            </el-form-item>
            <el-form-item label="详情：">
                <el-input v-model="introduce" placeholder="Approved by" />
              </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
          </el-form>
          <!-- 商品表格 -->
          <el-table :data="goodsList" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="title" label="商品" width="180" />
            <el-table-column prop="introduce" label="详情" />
            <p>{{data}}</p>
          </el-table>
          <!-- 分页器 -->
          <el-pagination background layout="prev, pager, next"  :total="data.length" v-model:currentPage="code" :page-size="7"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive ,toRefs,ref,watch,computed} from 'vue'
import {dataInt} from '@/type/Goods'
import {reqGoodList} from '@/api'
export default defineComponent({
    setup () {
        //搜索有关的数据
        const search:{name:string,introduce:string} = reactive({
            name:'',
            introduce:''
        })
        //后台返回商品数据
        const data:dataInt[] = reactive([])
        //接收后台数据，发送ajax请求
        async function getData(){
            let result = await reqGoodList()
            data.length = 0
            data.push.apply(data,result.data)
        }
        //当前页码
        let code = ref(1)
        //页面展示的列表
        let goodsList = computed(()=>{
          return data.slice((code.value-1)*7,code.value*7)
        })
        //搜索提交
        function onSubmit(){
          //有一个关键字即可
          //用来存储查询数据
          let arr: dataInt[] = []
          let {name,introduce} = search
          if(name || introduce){
            //只有name
            if(name && !introduce){
                arr = data.filter(item=>item.title.indexOf(name)!=-1)
            }else if(introduce && !name){
                arr = data.filter(item=>item.introduce.indexOf(introduce)!=-1)
            }else{
                arr = data.filter(item=>item.title.indexOf(name)!=-1 && item.introduce.indexOf(introduce)!=-1)
            }
          }
          data.length = 0
          data.push.apply(data,arr)
        }
        //监听搜索数据
        watch(search,(oldvalue,newvalue)=>{
          if(newvalue.introduce == '' || newvalue.name == ''){
            getData()
          }
        })
        //生命周期钩子
        onMounted(()=>{
            getData()
        })
        return {
            data,
            ...toRefs(search),
            code,
            goodsList,
            onSubmit
        }
    }
})
</script>

<style scoped>

</style>