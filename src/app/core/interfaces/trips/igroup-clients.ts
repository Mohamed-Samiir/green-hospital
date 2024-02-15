import { IgroupMembers } from './igroup-members';

export interface IgroupClients {
  id?:string
  clientFirstName?: string
  clientLastName?: string
  cost?: number
  total?:number
  members?: IgroupMembers[]
}
