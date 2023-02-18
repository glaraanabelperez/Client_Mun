

export class QueryDataModel<F, O>{

    filter? :F ;
    from: number;
    length :number;
    orderAsc?:boolean;
    orderField?:O
}
