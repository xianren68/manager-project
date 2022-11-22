<template>
    <div>
        <el-tree
        ref="treeRef"
        :data="permdata.PermList"
        show-checkbox
        node-key="roleId"
        :check-strictly="true"
        :default-checked-keys ="querydata.authority"
        :props="defaultProps"
  />
  <el-button @click="getCheckedNodes">确定修改</el-button>
    </div>
</template>

<script setup lang="ts">
import {reqAuthorityList} from '@/api/index'
import { onMounted} from '@vue/runtime-core'
import {useRoute} from 'vue-router'
import { reactive,ref} from 'vue'
import {permData} from '@/type/Perm'
import { ElTree } from 'element-plus'

const treeRef = ref<InstanceType<typeof ElTree>>()
    const permdata = reactive(new permData())
    //获取数据
    async function getData(){
        let result = await reqAuthorityList()
        permdata.PermList = result.data
    }
    //获得传过来的参数，用来指定默认选中的复选框
    const route = useRoute()
    const querydata = {
        roleId:route.query.roleId,
        authority:route.query.authority
    }
    const defaultProps = {
        children: 'roleList',
        label: 'name',
    }
    //获得复选框的值
    const getCheckedNodes = () => {
     console.log(treeRef.value!.getCheckedNodes(false, false))
    }
    onMounted(()=>{
        getData()
    })
</script>

<style scoped>

</style>