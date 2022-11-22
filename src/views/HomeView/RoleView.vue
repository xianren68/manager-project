<template>
    <div>
        <el-button type="primary" @click="open">添加角色</el-button>
        <!-- 展示部分 -->
        <el-table :data="data.RoleList" style="width: 100%">
            <el-table-column prop="roleId" label="id" width="180" />
            <el-table-column prop="roleName" label="等级" width="180" />
            <el-table-column label="详情" width="400">
                <template #default="scope">
                    <el-button @click="modify(scope.row)">
                        修改权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script setup lang="ts">
import { reqRoleList } from '@/api/index'
import { onMounted, reactive} from 'vue'
import { Role ,RoleListInt} from '@/type/Role'
import { ElMessage, ElMessageBox } from 'element-plus'
import {useRouter} from 'vue-router'
//存储获取的数据
const data = reactive(new Role())
//获取角色列表
async function getData() {
    let result = await reqRoleList()
    data.RoleList = result.data
}
//弹出框
const open = () => {
  ElMessageBox.prompt('请输入要添加的等级', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `添加等级:${value}`,
      })
      data.RoleList.push({roleId:data.RoleList.length+1,roleName:value,authority:[]})
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '添加已取消',
      })
    })
}
    const router = useRouter()
    function modify(role:RoleListInt){
        router.replace({
            name:'permission',
            query:{
                roleId:role.roleId,
                authority :role.authority
            }
        })
    }
//生命周期钩子
onMounted(() => {
    getData()
})
</script>

<style scoped>

</style>