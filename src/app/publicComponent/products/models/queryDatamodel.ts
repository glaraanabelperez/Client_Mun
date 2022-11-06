

export class QueryDataModel<F, O>{

    order?:O;
    orderAsc?:boolean;
    filter? :F ;
    from: number;
    length :number
}
