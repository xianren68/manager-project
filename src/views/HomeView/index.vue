<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="150px">
        <el-menu
          active-text-color="#d29934"
          background-color="#304059"
          class="el-menu-vertical-demo"
          :default-active="route.path"
          text-color="#fff"
        >
          <el-menu-item  v-for="paths in routerList" :key="paths.path" :index="paths.path" @click="routpush(paths.path)">
            <span >{{paths.meta.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <el-row :gutter="20">
            <el-col :span="18">
                <h2>后台管理系统</h2>
            </el-col>
            <el-col :span="6">
              <button @click="outLogin">退出登录</button>
            </el-col>
          </el-row>
        
        </el-header>
        <!-- 主要部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue';
import router from '@/router/index'
import {useRouter,useRoute} from 'vue-router'
export default defineComponent({
  name: 'HomeView',
  setup(){
    const routerList = reactive(useRouter().getRoutes().filter(item=>item.meta.isShow === true)) 
    const route = useRoute()
    function routpush(path:string){
      router.push(path)
    }
    function outLogin(){
      localStorage.removeItem("token")
      router.push('/login')
    }
    return {
      routerList,
      routpush,
      route,
      outLogin
    }
  }
});
</script>
<style lang="scss" scoped>
  .home {
    height: 100%;
  }
//头部
  .el-header {
    background: #153736;
    height: 100px;
    line-height: 100px;
    h2{
      height: 100px;
      text-align: center;
      line-height: 100px;
      color:rgba(255, 255, 255, 0.677)
    }
    button {
      margin-left: 100px;
      background-color: #8495b1;
    }

  }
  //侧边栏
  .el-aside {
    background: #304059;
    height: calc(100vh);
  }
</style>
