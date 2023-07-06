export interface Data {
    id:number,
    name:string,
}

interface Label {
    value:string,
    color:string
}

export interface MultiData{
    id:number,
    title:string,
    date:string,
    label:Label[],
    destination:string,
    link:string
}

// API CALLING

export type post ={
    userId:number,
    id:number,
    title:string,
    body:string
}
export type GetUsersResponse = {
    data: post[];
};
export interface postState {
    list:Data[],
    data:post[],
    loading?:boolean
}