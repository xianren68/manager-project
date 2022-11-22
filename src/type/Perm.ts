interface permListInt {
    name:string
    roleId:number,
    viewRole:string,
    roleList:permListInt[]

}
export class permData{
    PermList:permListInt[] = []
}