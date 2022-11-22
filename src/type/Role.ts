export interface RoleListInt {
    roleName:string,
    roleId:number,
    authority:number[]
}
export class Role{
    RoleList:RoleListInt[] = []
}