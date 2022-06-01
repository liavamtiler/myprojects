export interface User {
    id:number,
    name:string,
    password:string,
    image:string,
    gender:string,
    date_of_birth:Date
    is_admin:boolean
}

export interface Product{
    id:number,
    product_name:string,
    original_price_g:number,
    weight:number,
    description:string,
    image:string,
    petname:string,
    sold:number,
    brand_name:string,
    is_active:boolean
}