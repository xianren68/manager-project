<template>
    <div>
        <!-- 检索 -->
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="角色">
              <el-input v-model="search.user" placeholder="Approved by" />
            </el-form-item>
            <el-form-item label="用户">
              <el-select v-model="search.region" placeholder="Activity zone"  multiple>
                <el-option label="管理员" value="管理员" />
                <el-option label="普通用户" value="普通用户" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Query</el-button>
            </el-form-item>
          </el-form>
          <!-- 主体 -->
          <el-table :data="data.userList" style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="nickName" label="用户" width="180" />
            <el-table-column prop="role" label="详情" width="400">
                <template #default="scope">
                    <el-button v-for="item in scope.row.role" :key="item.role" link>
                        {{item.roleName}}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column  label="操作" width="200" size="small" prop="id">
                <template #default="scope">
                    <el-button @click="updateUser(scope.row.id)">编辑</el-button>
                </template>
                
            </el-table-column>
          </el-table>
          <!-- 弹出框 -->
          <el-dialog v-model="revise.isShow" title="修改用户信息" >
            <el-form :model="revise">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="revise.name" autocomplete="off"/>
              </el-form-item>
              <el-form-item label="用户权限" :label-width="formLabelWidth">
                <el-select v-model="revise.region" placeholder="Please select a zone" multiple>
                  <el-option label="管理员" value="管理员" />
                  <el-option label="普通用户" value="普通用户" />
                </el-select>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="remove">取消</el-button>
                <el-button type="primary" @click=" confirm"
                  >确认</el-button
                >
              </span>
            </template>
          </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {reqUserList} from '@/api/index'
import { onMounted, reactive ,watch} from '@vue/runtime-core'
import {UserInfoInt,searchInt,roleListInt} from '@/type/User'
const formLabelWidth = '140px'
    //后台数据相关
    //存放获取的数据
    const data = reactive(new UserInfoInt)
    //获取数据
    function getUserData(){
        reqUserList().then(
            res=>{
                data.userList = res.data
            }
        )
    }

    //搜索相关
    //搜索数据
    const search:searchInt = reactive({
        user:'',
        region:[]
    })
    //搜索按钮
    function onSubmit(){
        let {user,region} = search
        if(user){
            data.userList = data.userList.filter(item=>item.nickName === user)
        }
        if(region.length>0){
            data.userList = data.userList.filter(item=>{
                let list = trans(item.role)
                for(let i = 0; i<region.length;i++){
                    if(list.indexOf(region[i]) == -1){
                        
                        return false
                    }
                }
                return true
            })
        }
    }
    //将数组的形式转化，更便于比较
    function trans(arr:roleListInt[]){
        let list:string[] = []
        arr.forEach(item => {
            list.push(item.roleName)
        });
        return list
    }

    //修改相关
    //修改数据
    const revise = reactive({
        isShow:false,
        name:'',
        region:[],
        //当前编辑的用户id
        id:0
    })
    //编辑按钮
    function updateUser(id:number){
        revise.isShow = true
        revise.id = id
    }
    //取消修改
    function remove(){
        revise.isShow = false
        revise.region = []
        revise.name = ''
        revise.id = 0
    }
    //确定修改

    function confirm(){
        data.userList.forEach(item=>{
            if(item.id == revise.id){
                item.nickName = revise.name
                item.username = revise.name
                item.role = revise.region.map((item,index)=>{return {role:index+1,roleName:item}})
                remove()
            }
        })
    }
    //监听search数据的变化
    watch(search,(oldvalue,newvalue)=>{
        if(newvalue.region.length == 0 || newvalue.user == ''){
            getUserData()
        }
    })
    //生命周期钩子
    onMounted(()=>{
        getUserData()
    })
</script>

<style scoped>
    .el-input, .el-select {
        width: 100%;
    
    }
</style>