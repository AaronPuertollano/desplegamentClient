const a = [1,2,3,4];
const b = [1,2,3,4];
const c = [1,2,3,4];
const o = {0: "a", 1: "b", length:2}; //en javascript la diferencia entre array y objetoes minima ya que el array es considerado como un objeto con una longitud

a= a.slice(1,1)//primero eliges el indice y despues la cantidad que quieres eliminar

a.concat(b); //juntar 2 arrays y genera un nuevo array
[...a,...b];//ooooo... puedes hacer esto
a.concat(b).concat(c);


const e = [1,2,3,undefined,null,undefined,undefined,10];
for (const i of e) console.log(i); //1,2,3,undefined,null,undefined,undefined,10

a.push(1);//añade valores al array

const ar = [1,2,3,4,5];
function pop(){
    return ar.pop();
}

function push(d){
    return ar.push();
}
