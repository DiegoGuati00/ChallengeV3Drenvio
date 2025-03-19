import Controller from "./Controller";

class Lista extends Controller {
    constructor(personas){
        super(personas)
        this.ha= true
        this.rules = {}
        this.format = [];
        this.fieldTabla = [];
    }
}

export default Lista;