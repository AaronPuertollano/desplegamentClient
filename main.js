/* que es http? si hago un post a una collecion que codigo html deberia devolver?

put post patch delete diferecnias

const response = fetch("https://api.thecatapi.com/v1/images/search").then((p) => {
    if(p.status === 200){
        return p.json().then((body) => {
            document.getElementById("cat").src= body[0].url;
        })
    }
}).catch((e) => console.error(e));


como declarar funciones? que tipos hay? arrow, expresion
que son la funciones anonimas?

var let const, diferecnias

que es el hoisting? 

true, false o undefied o error? ejemplos de codigo

como se comprime un codigo? script asycrn type module

let url = window.location.href / para modificar una url
url.searchparam.append

aplicar un login mentres es fa una api
*/

const promise = fetch("api.thecatapi.com");//saber sus estados: ponging, fullfilled, rejected
promise.then((value) => {
    //lo que se tenga que hacer con el valor de la promesa
})
promise.catch((error) => {
    console.error(error);
}); //tambien se pude encadenar .then.catch

const response = await fetch("...");//con await paraliza la funcion hasta obtener una respuetsa del fetch
//EXAMEN, utilizaremos una api y usaremos fetch para obtener valores de esa api, puede mostrar un codigo con una promesa
//y preguntarnos cosas sobre el funcionamiento de ese codigo, que hace? que saldria en pantalla? etc...

//ejemplo de una promesa
const promise2 = new Promise((resolve,reject) => {
    const value = Math.random;
    if(value > 1){
        resolve(value);
    } else {
        reject(new Error("Error!"));
    }
});

const fetchCat = async () => {
    try{
        const res = await fetch("https://api.thecatapi.com/v1/images/search");
        if(res.status === 200){
            const body = await res.json();
            console.log(res);
            document.getElementById("cat").src= body[0].url;
        }
    } catch (e){
        console.error(e);
    }
}

fetchCat();

