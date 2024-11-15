/* que es http? si hago un post a una collecion que codigo html deberia devolver?
put post patch delete diferecnias
const response = fetch("https://api.thecatapi.com/v1/images/search").then((p) => {
    if(p.status === 200){
        return p.json().then((body) => {
            document.getElementById("cat").src= body[0].url;
        })
    }
}).catch((e) => console.error(e));
*/

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

