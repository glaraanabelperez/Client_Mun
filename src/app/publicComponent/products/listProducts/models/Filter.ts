export class Filter{

    State :boolean;
    CategoryId:number;
    Featured :boolean;
    MarcaId:number;

    constructor(){
        this.MarcaId=null;
        this.State=false;
        this.Featured=false;
        this.CategoryId=null;
    }
}
