function f1(){
    //función declarada
}

f2(); //función sin declarar

const f2 = function f3(){}; //función anónima declarada a una variable
//son lo mismo? examen alert, hacen lo mismo exepto en el caso del uso del this
const f = () => {}; //arrow function

//let var const diferecnias examen alert

const o = {
    x: 1,
    y: 2,
    helloWold: function(){
        return this.x;
    }
}; //return undefined

const o2 = {
    x: 1,
    y: 2,
    helloWold: () => {
        return this.x;
    }
}; //return undefined también

const per = {
    name: "Paco",
    surName: "Marti",
    getFullName: function(){
        return '${this.name}${this.surName}'
    }
}

