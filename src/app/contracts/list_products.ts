import { List_Product_Image } from "./list_product_image";

export class List_Product{
    id:number;
    name:string;
    stock:number;
    price:number;
    createdDate:Date;
    updatedDate:Date;
    productImage?:List_Product_Image[];
    imagePath:string;
}