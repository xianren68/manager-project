import requests from "./request";
//登录接口 
export const reqLogin = (data:{username:string,password:string})=>requests({url:"/login",data,method:"post"})
//商品列表接口
export const reqGoodList = ()=>requests.get('/getGoodsList')
//用户列表接口
export const reqUserList = ()=>requests.get('/getUserList')
//角色列表接口
export const reqRoleList = ()=>requests.get('/getRoleList')
//权限列表接口
export const reqAuthorityList = ()=>requests.get("/getAuthorityList")