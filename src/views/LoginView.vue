<template>
  <div class="login">
    <h2>后台管理系统</h2>
    <el-form
    
    :model="formdata"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="formdata.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formdata.password" />
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="submitForm()"
        >登录</el-button
      >
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script lang="ts">
import type {FormRules} from 'element-plus'
import { defineComponent, reactive } from 'vue'
import {reqLogin} from '../api/index'
import {formData} from '../type/Login'
import router from '../router'
export default defineComponent({
  setup () {
    // const ruleFormRef = ref<FormInstance>()
    const formdata:formData = reactive({
      username:'',
      password:''
    })
    const rules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 5, message: '用户名长度应在3到5之间', trigger: 'blur' },
    ],
    password:[
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 10, message: '密码长度应在3到10之间', trigger: 'blur' },
    ]
  })
    async function submitForm(){
      let result = await reqLogin(formdata)
      if(result.data.code == 200){
        localStorage.setItem("token",result.data.token)
        router.push('/')
      }else{
        alert("用户名或密码错误！")
      }
      
    }
    function resetForm(){
      formdata.password = '',
      formdata.username = ''
    }
    return {
      formdata,
      rules,
      submitForm,
      resetForm
    }
  }
})
</script>

<style scoped lang="scss">
  .login {
    box-shadow: 0 0 10px #ccc;
    border-radius: 6%;
    width: 400px;
    height: 300px;
    margin:200px auto;
    background:rgb(193, 171, 193);
    padding: 1px;
    .demo-ruleForm{
      width:80%;
      margin-top:40px;
      margin-right: 50px;
      
      
    }
    h2 {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>
