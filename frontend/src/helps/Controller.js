class Controller{

    constructor(personas){
        this.origin = personas
        this.result=this.origin;
        this.keys = Object.keys(this.origin ? this.origin.lentgh < 1 ? this.origin[0] : this.origin : {});
        this.dependencia = {}
    }

    // find(){

    // }

    Where(rules){
        if(!rules){
            rules = [['name','ddd'],['email.email','lksdewdsds@corre.com']];
        }
        let result = this.origin;
        rules.forEach((rule,i)=>{
            result = result.filter((v)=>{
                console.log()
                let run = v
                if(rule[0].split('.').length > 1){
                    let d = rule[0].split('.');
                    d.forEach((el)=>{
                        run = run[el]
                    });
                }else{
                    run = run[rule[0]];
                }
                return run === rule[1];
            })
        });
        this.result = result;
    }

    find(n,a=null){
        if(this.result){
            this.setResult()
            if(Array.isArray(n)||n === true){
                let arr = n;
                if(n === true){
                    if(this.format === undefined){
                        return false
                    }
                    arr = this.format
                }
                let res;
                if(!a){
                    res = this.result.map((value,index)=>{
                        let list = [];
                        arr.forEach((v,i)=>{
                            if(Array.isArray(v)){
                                let listL =[]
                                v.forEach((next)=>{
                                    let posicion = next.split('.')
                                    if(posicion.length > 1){
                                        let val;
                                        posicion.forEach((next)=>{
                                            if(val === undefined){
                                                val = value[next]
                                            }else{
                                                if(val){
                                                    if(val[next] === undefined){
                                                        val = null
                                                    }else{
                                                        val = val[next]
                                                    }
                                                }
                                                // console.log(val)
                                            }
                                        })
                                        listL.push(val);
                                    }else{
        
                                        listL.push(value[v]);
                                    }

                                })
                                list.push(listL);

                            }else{
                                let posicion = v.split('.')
                                if(posicion.length > 1){
                                    let val;
                                    posicion.forEach((next)=>{
                                        if(val === undefined){
                                            val = value[next]!== undefined ? value[next]: ' '
                                        }else{
                                            if(val){
                                                val = val[next] !== undefined ? val[next]: ' '
                                            }
                                            // console.log(val)
                                        }
                                    })
                                    list.push(val);
                                }else{
    
                                    list.push(value[v]);
                                }
                            }
                        })
                        return list;
                    })
                }else{
                    if(this.result[a] === undefined){
                        return false;
                    }
                    let value = this.result[a];
                    let list =[];
                    arr.forEach((v,i)=>{
                        if(Array.isArray(v)){
                            let listL =[]
                            v.forEach((next)=>{
                                let posicion = next.split('.')
                                if(posicion.length > 1){
                                    let val;
                                    posicion.forEach((next)=>{
                                        if(val === undefined){
                                            val = value[next]
                                        }else{
                                            val = val[next]
                                        }
                                    })
                                    listL.push(val);
                                }else{
    
                                    listL.push(value[v]);
                                }

                            })
                            list.push(listL);

                        }else{
                            let posicion = v.split('.')
                            if(posicion.length > 1){
                                let val;
                                posicion.forEach((next)=>{
                                    if(val === undefined){
                                        val = value[next]
                                    }else{
                                        val = val[next]
                                    }
                                })
                                list.push(val);
                            }else{

                                list.push(value[v]);
                            }
                        }
                    })
                    return list;
                }
                return res;
            }else{
                if(this.result[n] !== undefined){
                    let f = 'ha'
                    console.log()
                    console.log(this.ha !== undefined)
                    return this.result[n];
                }
                return "falses"
            }
        }
    }

    get(){
        return this.result;
    }

    // setResult(){
    //     if(this.result){
            
    //     }
    // }

    
    
    
    
    setResult(){
        // console.log(this.result)
        if(this.rules !== undefined){
            if(this.result){
                let result = this.result.map((res)=>{
                    let keys = Object.keys(this.rules);
                    keys.forEach((rule)=>{
                        let currntRule = this.rules[rule];
                        currntRule.forEach((rul)=>{
                            // console.log(rul)
                            // console.log(rul[0].split('.').length > 1)
                            let compare;
                            
                            if(rul[0].split('.').length > 1){
                                let origin;
                                let newVal;
                                let nextVal;
                                const s =()=>{

                                }
                                let arr = rul[0].split('.');
                                arr.forEach((next)=>{
                                    
                                    if(nextVal === undefined){
                                        nextVal = res[next] 
                                    }else{
                                        nextVal = nextVal[next]
                                        if(arr.length > 3){
                                            newVal = nextVal;
                                        }
                                    }


                                })
                                return 'dahd'
                                let position = rul[0].split('.');
                                // let 
                                // position.forEach(()=>{
    
                                // })
                                // res[rule]
                            }else{
                                compare = res[rul[0]];
                            }
                            if(compare !== undefined){
                                rul[1].forEach((igual)=>{
                                    if(compare === igual[0]){
                                        // console.log(igual[1])
                                        res[rul[0]] = igual[1]
                                    }
                                })
                            }
                        })
                    })
                    return res;
                })
                return result
    
             }else{
                return {}
             }
        }
    }



    ApiData(){
        return {
            get: ()=>{
                
            },
        }
    }

    getFormat(){
        if(this.format !== undefined){
            return this.format
        }
        return []
    }





}
export default Controller