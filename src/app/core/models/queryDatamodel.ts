import { Filter } from "./Filter";
import { OrderField } from "./OrderField";

export class QueryDataModel{

    OrderField:OrderField;
    OrderAsc:boolean;
    Filter :Filter ;
    From: number;
    Length :number
}
