
const btnsearch = document.querySelector("#search");
btnsearch.onclick = fetchCat();

const getbreeds = async () => {
    fetch(`https://api.thecatapi.com/v1//breeds/search`)
    .then(function(data){

        data.forEach(function(photo){

        });
        
    });
}

const fetchCat = async () => {
    var breed = document.getElementById("breeds");
    try{
        const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`);
        if(res.status === 200){
            const body = await res.json();
            console.log(res);
            document.getElementById("cat").src= body[0].url;
        }
    } catch (e){
        console.error(e);
    }
}