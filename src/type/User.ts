export interface UserInt{
    id:number
    nickName:string
    role:roleListInt[],
    username?:string
}
export interface roleListInt{
    role: number,
    roleName: string
}
//搜索数据
export interface searchInt{
    user:string
    region:string[]


}
//后台数据，数组最好包裹在对象中，否则修改起来特别烦
export class UserInfoInt{
    userList:UserInt[] = []
}