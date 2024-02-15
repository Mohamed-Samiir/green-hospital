export interface IgroupAssignValue {
  groupId?: string,
  driverId?: string,
  groupDetails?: IgroupDetailsAssignValue []
}
export interface IgroupDetailsAssignValue {
  groupDetailsId?: string,
  cost?: number
}
